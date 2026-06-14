/**
 * app.js — Álbum Copa 2026 v3.0 (simplificado)
 *
 * Funcionalidades:
 *   - CRUD de 3 estados (Tenho / Falta / Repetida) por figurinha
 *   - Persistência em localStorage
 *   - Modo único simplificado: card com número + escudo + nome
 *   - Filtros: busca, estado, categoria, grupo, seleção, posição, raridade
 *   - Dashboard com 6 cards (Conclusão, Total, Tenho, Falta, Repetida, Lendárias)
 *   - Gráfico de progresso por seleção
 *   - Partículas de fundo
 *   - SEM imagens externas — tudo SVG inline
 */

(function () {
  'use strict';

  // =================== CONSTANTES ===================
  const STORAGE_KEY = 'album-copa-2026-v3';
  const MODO_PADRAO = 'detalhada';

  // =================== ESTADO GLOBAL ===================
  const estado = {
    estados: new Map(),
    filtros: {
      busca: '',
      estado: 'todas',
      categoria: 'todas',
      grupo: 'todos',
      selecao: 'todas',
      posicao: 'todas',
      raridade: 'todas'
    }
  };

  // =================== DADOS ===================
  const dados = window.AlbumCopa.data;

  // =================== BANDEIRAS (do data.js) ===================
  function getBandeira(sel) {
    const bandeiras = window.AlbumCopa.BANDEIRAS;
    if (!bandeiras) return null;
    return bandeiras[sel] || null;
  }

  const CORES_PADRAO = ['#2E7D32', '#FFB300', '#1565C0'];

  // =================== GERADOR DE ESCUDO MINI ===================
  function gerarMiniEscudo(cores, tipo, uid) {
    const c1 = cores[0] || '#666';
    const c2 = cores[1] || '#FFF';
    const c3 = cores[2] || '#333';

    // Gera o pattern da bandeira
    let bandeiraSvg = '';
    if (tipo === 'faixas-h' || !tipo) {
      bandeiraSvg = `<rect x="0" y="0" width="60" height="20" fill="${c1}"/>
        <rect x="0" y="20" width="60" height="20" fill="${c2}"/>
        <rect x="0" y="40" width="60" height="20" fill="${c3}"/>`;
    } else if (tipo === 'faixas-v') {
      bandeiraSvg = `<rect x="0" y="0" width="20" height="60" fill="${c1}"/>
        <rect x="20" y="0" width="20" height="60" fill="${c2}"/>
        <rect x="40" y="0" width="20" height="60" fill="${c3}"/>`;
    } else if (tipo === 'cruz') {
      bandeiraSvg = `<rect x="0" y="0" width="60" height="60" fill="${c1}"/>
        <rect x="24" y="0" width="12" height="60" fill="${c2}"/>
        <rect x="0" y="24" width="60" height="12" fill="${c2}"/>`;
    } else if (tipo === 'circulo') {
      bandeiraSvg = `<rect x="0" y="0" width="60" height="60" fill="${c1}"/>
        <circle cx="30" cy="30" r="18" fill="${c2}"/>`;
    } else if (tipo === 'diagonal') {
      bandeiraSvg = `<rect x="0" y="0" width="60" height="60" fill="${c1}"/>
        <polygon points="0,0 60,0 60,60" fill="${c2}"/>`;
    } else if (tipo === 'triangulo') {
      bandeiraSvg = `<rect x="0" y="0" width="60" height="60" fill="${c1}"/>
        <polygon points="0,0 30,30 0,60" fill="${c2}"/>`;
    } else if (tipo === 'listras') {
      let s = '';
      for (let i = 0; i < 7; i++) {
        s += `<rect x="0" y="${i * 60/7}" width="60" height="${60/7}" fill="${i % 2 === 0 ? c1 : c2}"/>`;
      }
      bandeiraSvg = s;
    } else {
      bandeiraSvg = `<rect x="0" y="0" width="60" height="20" fill="${c1}"/>
        <rect x="0" y="20" width="60" height="20" fill="${c2}"/>
        <rect x="0" y="40" width="60" height="20" fill="${c3}"/>`;
    }

    // Path do escudo (formato heráldico)
    const path = 'M4,8 Q4,4 8,4 L52,4 Q56,4 56,8 L56,40 Q56,56 30,68 Q4,56 4,40 Z';
    const clipId = 'ec' + (uid || Math.random().toString(36).slice(2, 8));

    return `<svg class="fig__escudo" viewBox="0 0 60 70" width="50" height="58">
      <defs>
        <clipPath id="${clipId}">
          <path d="${path}"/>
        </clipPath>
      </defs>
      <g>
        <g clip-path="url(#${clipId})">
          <rect x="0" y="0" width="60" height="70" fill="${c1}"/>
          <g transform="translate(0,5)">${bandeiraSvg}</g>
        </g>
        <path d="${path}" fill="none" stroke="#d4af37" stroke-width="0.8"/>
        <path d="${path}" fill="none" stroke="#1a1a1a" stroke-width="1.5"/>
      </g>
    </svg>`;
  }

  // =================== LOCALSTORAGE ===================
  function carregarEstados() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const obj = JSON.parse(raw);
      Object.keys(obj).forEach((id) => {
        if (['tenho', 'falta', 'repetida'].includes(obj[id])) {
          estado.estados.set(id, obj[id]);
        }
      });
    } catch (err) {
      console.warn('Falha ao ler localStorage:', err);
    }
  }

  function salvarEstados() {
    try {
      const obj = {};
      estado.estados.forEach((v, id) => { obj[id] = v; });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(obj));
    } catch (err) {
      console.warn('Falha ao salvar:', err);
    }
  }

  // =================== CRUD ===================
  function definirEstado(id, novoEstado) {
    if (novoEstado === null) estado.estados.delete(id);
    else estado.estados.set(id, novoEstado);
    salvarEstados();
    renderizarTudo();
  }

  function alternarEstadoRapido(id) {
    const atual = estado.estados.get(id);
    const ciclo = ['tenho', 'repetida', 'falta'];
    if (!atual) {
      definirEstado(id, 'tenho');
      return;
    }
    const idx = ciclo.indexOf(atual);
    if (idx === ciclo.length - 1) definirEstado(id, null);
    else definirEstado(id, ciclo[idx + 1]);
  }

  function limparTudo() {
    if (!confirm('Apagar TODAS as marcações? Isso não dá pra desfazer.')) return;
    estado.estados.clear();
    salvarEstados();
    renderizarTudo();
  }

  // =================== FILTRAGEM ===================
  function aplicarFiltros() {
    const f = estado.filtros;
    const busca = (f.busca || '').toLowerCase().trim();
    return dados.figurinhas.filter((fig) => {
      if (busca) {
        const hay = (fig.nome + ' ' + fig.selecao + ' ' + fig.categoria + ' ' + (fig.posicao || '') + ' ' + (fig.grupo || '')).toLowerCase();
        if (!hay.includes(busca)) return false;
      }
      if (f.estado !== 'todas' && estado.estados.get(fig.id) !== f.estado) return false;
      if (f.categoria !== 'todas' && fig.categoria !== f.categoria) return false;
      if (f.grupo !== 'todos' && fig.grupo !== f.grupo) return false;
      if (f.selecao !== 'todas' && fig.selecao !== f.selecao) return false;
      if (f.posicao !== 'todas' && fig.posicao !== f.posicao) return false;
      if (f.raridade !== 'todas' && fig.raridade !== f.raridade) return false;
      return true;
    });
  }

  // =================== RENDER: DASHBOARD ===================
  function renderizarDashboard() {
    const total = dados.total;
    const tenho = [...estado.estados.values()].filter((v) => v === 'tenho').length;
    const falta = [...estado.estados.values()].filter((v) => v === 'falta').length;
    const repetida = [...estado.estados.values()].filter((v) => v === 'repetida').length;
    const lendarias = dados.figurinhas.filter((f) =>
      f.raridade === 'lendaria' && estado.estados.get(f.id) === 'tenho'
    ).length;

    const pct = total ? Math.round((tenho / total) * 100) : 0;

    document.getElementById('stat-percentual').textContent = pct + '%';
    document.getElementById('stat-concluidas').textContent = `${tenho} de ${total} figurinhas`;
    document.getElementById('stat-total').textContent = total;
    document.getElementById('stat-tenho').textContent = tenho;
    document.getElementById('stat-falta').textContent = falta;
    document.getElementById('stat-repetida').textContent = repetida;
    document.getElementById('stat-lendaria').textContent = lendarias;
    document.getElementById('barra-progresso-preenchimento').style.width = pct + '%';
  }

  // =================== RENDER: GRÁFICO POR SELEÇÃO ==================
  function renderizarGrafico() {
    const container = document.getElementById('grafico-selecoes');
    const map = new Map();
    let totalTenho = 0;
    let totalSelecoes = 0;
    dados.figurinhas.forEach((f) => {
      if (f.categoria !== 'jogador' && f.categoria !== 'tecnico') return;
      const key = f.selecao;
      if (!map.has(key)) map.set(key, { total: 0, tenho: 0 });
      const e = map.get(key);
      e.total++;
      if (estado.estados.get(f.id) === 'tenho') {
        e.tenho++;
        totalTenho++;
      }
    });
    const items = [...map.entries()]
      .map(([nome, v]) => ({ nome, ...v, pct: v.total ? (v.tenho / v.total) * 100 : 0 }))
      .sort((a, b) => b.pct - a.pct || a.nome.localeCompare(b.nome));
    totalSelecoes = [...map.values()].reduce((acc, v) => acc + v.total, 0);
    container.innerHTML = items.map((it) => `
      <div class="grafico__item">
        <div class="grafico__item-header">
          <span class="grafico__item-nome">${escapeHtml(it.nome)}</span>
          <span class="grafico__item-num">${it.tenho}/${it.total}</span>
        </div>
        <div class="grafico__item-barra">
          <div class="grafico__item-preench" style="width: ${it.pct.toFixed(0)}%"></div>
        </div>
      </div>
    `).join('');
    const elTotal = document.getElementById('grafico-total');
    if (elTotal) elTotal.textContent = `${totalTenho}/${totalSelecoes}`;
  }

  // =================== RENDER: CATÁLOGO ===================
  function renderizarCatalogo() {
    const catalogo = document.getElementById('catalogo');
    const figs = aplicarFiltros();

    catalogo.className = 'catalogo';

    document.getElementById('resultado-contador').textContent = figs.length;
    document.getElementById('resultado-total').textContent = dados.total;

    if (!figs.length) {
      catalogo.innerHTML = `
        <div class="estado-vazio">
          <div class="estado-vazio__icone">🔍</div>
          <p class="estado-vazio__titulo">Nenhuma figurinha encontrada</p>
          <p>Tente ajustar os filtros ou limpar a busca.</p>
        </div>`;
      return;
    }

    catalogo.innerHTML = figs.map(renderFigurinha).join('');

    // Eventos — clique no card alterna popup
    let popupAtual = null;

    catalogo.querySelectorAll('.figurinha').forEach((el) => {
      el.addEventListener('click', (e) => {
        if (e.target.closest('.figurinha__popup-btn')) return;

        // burst visual
        el.classList.remove('burst');
        void el.offsetWidth;
        el.classList.add('burst');

        const popup = el.querySelector('.figurinha__popup');
        if (!popup) return;

        if (popup.classList.contains('aberto')) {
          popup.classList.remove('aberto');
          popupAtual = null;
        } else {
          document.querySelectorAll('.figurinha__popup.aberto').forEach(p => p.classList.remove('aberto'));
          popup.classList.add('aberto');
          popupAtual = popup;
        }
      });
    });

    // Botões do popup
    catalogo.querySelectorAll('.figurinha__popup-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const popup = btn.closest('.figurinha__popup');
        const card = btn.closest('.figurinha');
        if (!card || !popup) return;
        const id = card.dataset.id;
        const estadoBtn = btn.dataset.estado;

        if (estadoBtn === 'none') {
          definirEstado(id, null);
        } else {
          const atual = estado.estados.get(id);
          definirEstado(id, atual === estadoBtn ? null : estadoBtn);
        }

        popup.classList.remove('aberto');
        popupAtual = null;
      });
    });

    // Fecha popups ao clicar fora
    document.addEventListener('click', (e) => {
      if (!popupAtual) return;
      if (!e.target.closest('.figurinha__popup') && !e.target.closest('.figurinha')) {
        popupAtual.classList.remove('aberto');
        popupAtual = null;
      }
    }, { once: false });
  }

  function renderFigurinha(fig) {
    const est = estado.estados.get(fig.id) || '';
    const isEsp = fig.categoria !== 'jogador' && fig.categoria !== 'tecnico';
    const categoriaLabel = fig.categoria ? fig.categoria.charAt(0).toUpperCase() + fig.categoria.slice(1) : '';

    // Pega cores da bandeira da seleção
    const bandeira = getBandeira(fig.selecao);
    const cores = bandeira ? bandeira.cores : CORES_PADRAO;
    const tipo = bandeira ? bandeira.tipo : 'faixas-h';

    // Gera o escudo SVG inline (mini)
    const escudoSvg = gerarMiniEscudo(cores, tipo, fig.id);

    // Selo de raridade
    const seloRar = fig.raridade === 'lendaria' ? '<span class="fig__selo fig__selo--lenda">&#9733;</span>'
      : fig.raridade === 'rara' ? '<span class="fig__selo fig__selo--rara">&#9670;</span>'
      : '';

    const estLabel = est === 'tenho' ? '&#10003;' : est === 'repetida' ? '&#8635;' : est === 'falta' ? '&#10007;' : '';

    return `
      <article class="figurinha" data-id="${fig.id}" data-estado="${est}" data-raridade="${fig.raridade}">
        <div class="fig__card">
          <div class="fig__cabecalho">
            <span class="fig__numero">${String(fig.numero).padStart(3, '0')}</span>
            ${seloRar}
          </div>
          <div class="fig__corpo">
            ${escudoSvg}
          </div>
          <div class="fig__info">
            <span class="fig__nome">${escapeHtml(fig.nome)}</span>
            ${!isEsp ? `<span class="fig__selecao">${escapeHtml(fig.selecao)}</span>` : `<span class="fig__selecao">${categoriaLabel}</span>`}
            ${fig.posicao && fig.posicao !== 'ESP' ? `<span class="fig__posicao">${fig.posicao}</span>` : ''}
          </div>
          ${est ? `<span class="fig__marca fig__marca--${est}">${estLabel}</span>` : ''}
          <div class="figurinha__popup" id="popup-${fig.id}">
            <span class="figurinha__popup-label">STATUS</span>
            <button class="figurinha__popup-btn ${est === 'tenho' ? 'ativo' : ''}" data-estado="tenho" type="button">&#10003; Tenho</button>
            <button class="figurinha__popup-btn ${est === 'repetida' ? 'ativo' : ''}" data-estado="repetida" type="button">&#8635; Repetida</button>
            <button class="figurinha__popup-btn ${est === 'falta' ? 'ativo' : ''}" data-estado="falta" type="button">&#10007; Falta</button>
            ${est ? '<button class="figurinha__popup-btn figurinha__popup-btn--limpar" data-estado="none" type="button">&#8212; Limpar</button>' : ''}
          </div>
        </div>
      </article>`;
  }

  // =================== FILTROS ===================
  function popularFiltros() {
    const cats = ['todas', ...(dados.categorias || [])];
    const sel = document.getElementById('filtro-categoria');
    cats.forEach((c) => {
      const opt = document.createElement('option');
      opt.value = c;
      opt.textContent = c.charAt(0).toUpperCase() + c.slice(1);
      sel.appendChild(opt);
    });

    const gr = document.getElementById('filtro-grupo');
    dados.grupos.forEach((g) => {
      const opt = document.createElement('option');
      opt.value = g; opt.textContent = g === 'ESP' ? 'Especiais' : 'Grupo ' + g;
      gr.appendChild(opt);
    });

    const sl = document.getElementById('filtro-selecao');
    const selecoes = [...new Set(
      dados.figurinhas
        .filter((f) => f.categoria === 'jogador' || f.categoria === 'tecnico')
        .map((f) => f.selecao)
    )].sort();
    selecoes.forEach((s) => {
      const opt = document.createElement('option');
      opt.value = s; opt.textContent = s;
      sl.appendChild(opt);
    });

    const ps = document.getElementById('filtro-posicao');
    dados.posicoes.forEach((p) => {
      const opt = document.createElement('option');
      opt.value = p;
      opt.textContent = p === 'ESP' ? 'Especial' : p;
      ps.appendChild(opt);
    });
  }

  function ligarFiltros() {
    document.getElementById('filtro-busca').addEventListener('input', (e) => {
      estado.filtros.busca = e.target.value;
      renderizarCatalogo();
    });
    document.getElementById('filtro-estado').addEventListener('change', (e) => {
      estado.filtros.estado = e.target.value;
      renderizarCatalogo();
    });
    document.getElementById('filtro-categoria').addEventListener('change', (e) => {
      estado.filtros.categoria = e.target.value;
      renderizarCatalogo();
    });
    document.getElementById('filtro-grupo').addEventListener('change', (e) => {
      estado.filtros.grupo = e.target.value;
      renderizarCatalogo();
    });
    document.getElementById('filtro-selecao').addEventListener('change', (e) => {
      estado.filtros.selecao = e.target.value;
      renderizarCatalogo();
    });
    document.getElementById('filtro-posicao').addEventListener('change', (e) => {
      estado.filtros.posicao = e.target.value;
      renderizarCatalogo();
    });
    document.getElementById('filtro-raridade').addEventListener('change', (e) => {
      estado.filtros.raridade = e.target.value;
      renderizarCatalogo();
    });
    document.getElementById('btn-limpar-filtros').addEventListener('click', () => {
      estado.filtros = {
        busca: '', estado: 'todas', categoria: 'todas', grupo: 'todos',
        selecao: 'todas', posicao: 'todas', raridade: 'todas'
      };
      document.getElementById('filtro-busca').value = '';
      document.getElementById('filtro-estado').value = 'todas';
      document.getElementById('filtro-categoria').value = 'todas';
      document.getElementById('filtro-grupo').value = 'todos';
      document.getElementById('filtro-selecao').value = 'todas';
      document.getElementById('filtro-posicao').value = 'todas';
      document.getElementById('filtro-raridade').value = 'todas';
      renderizarCatalogo();
    });
  }

  // =================== HELPERS ===================
  function escapeHtml(str) {
    if (str == null) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // =================== RENDER ALL ===================
  function renderizarTudo() {
    renderizarDashboard();
    renderizarGrafico();
    renderizarCatalogo();
  }

  // =================== TEMA (DARK/LIGHT) ===================
  function carregarTema() {
    try {
      const t = localStorage.getItem('album-copa-tema');
      if (t === 'light' || t === 'dark') {
        document.documentElement.setAttribute('data-tema', t);
      } else {
        document.documentElement.setAttribute('data-tema', 'dark');
      }
    } catch (e) {
      document.documentElement.setAttribute('data-tema', 'dark');
    }
    atualizarIconeTema();
  }

  function alternarTema() {
    const atual = document.documentElement.getAttribute('data-tema') || 'dark';
    const novo = atual === 'dark' ? 'light' : 'dark';
    document.documentElement.style.transition = 'none';
    document.documentElement.setAttribute('data-tema', novo);
    try { localStorage.setItem('album-copa-tema', novo); } catch (e) {}
    void document.documentElement.offsetHeight;
    requestAnimationFrame(() => {
      document.documentElement.style.transition = '';
    });
    atualizarIconeTema();
  }

  function atualizarIconeTema() {
    const atual = document.documentElement.getAttribute('data-tema') || 'dark';
    const lua = document.querySelector('.icone-lua');
    const sol = document.querySelector('.icone-sol');
    if (!lua || !sol) return;
    if (atual === 'dark') {
      lua.style.display = 'block';
      sol.style.display = 'none';
    } else {
      lua.style.display = 'none';
      sol.style.display = 'block';
    }
  }

  // =================== PARTÍCULAS DE FUNDO ===================
  function initParticles() {
    const container = document.createElement('div');
    container.className = 'particles';
    container.id = 'particles';
    document.body.appendChild(container);

    const count = Math.min(Math.floor(window.innerWidth / 30), 40);
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const size = 1 + Math.random() * 2.5;
      const delay = Math.random() * 20;
      const dur = 15 + Math.random() * 25;
      p.style.cssText = `
        left: ${x}%;
        top: ${y}%;
        width: ${size}px;
        height: ${size}px;
        animation: float-particle ${dur}s ${delay}s infinite ease-in-out;
        opacity: ${0.1 + Math.random() * 0.15};
      `;
      container.appendChild(p);
    }
  }

  // =================== EXPORTA getBandeira pro HTML ===================
  window.getBandeira = getBandeira;

  // =================== INIT ===================
  function init() {
    if (!dados || !dados.figurinhas) {
      console.error('data.js não carregou ou tem formato inválido');
      return;
    }
    carregarTema();
    carregarEstados();
    popularFiltros();
    ligarFiltros();
    initParticles();
    document.getElementById('btn-limpar').addEventListener('click', limparTudo);
    document.getElementById('btn-tema').addEventListener('click', alternarTema);
    renderizarTudo();
    console.log(`✅ Álbum Copa 2026 inicializado: ${dados.total} figurinhas, ${dados.grupos.length} grupos`);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
