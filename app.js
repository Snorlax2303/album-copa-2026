/**
 * app.js — Álbum Copa 2026 v2.0
 *
 * Funcionalidades:
 *   - CRUD de 3 estados (Tenho / Falta / Repetida) por figurinha
 *   - Persistência em localStorage
 *   - 4 modos de visualização: detalhada, album, minimal, showcase
 *   - Filtros: busca, estado, categoria, grupo, seleção, posição, raridade
 *   - Dashboard com 6 cards (Conclusão, Total, Tenho, Falta, Repetida, Lendárias)
 *   - Gráfico de progresso por seleção
 *   - Bump de versão: album-copa-2026-v2 (dados expandidos)
 */

(function () {
  'use strict';

  // =================== CONSTANTES ===================
  const STORAGE_KEY = 'album-copa-2026-v2';
  const MODOS = ['detalhada', 'album', 'minimal', 'showcase'];
  const MODO_PADRAO = 'detalhada';

  // =================== ESTADO GLOBAL ===================
  const estado = {
    estados: new Map(),
    modo: MODO_PADRAO,
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

  function carregarModo() {
    try {
      const m = localStorage.getItem('album-copa-modo');
      if (m && MODOS.includes(m)) estado.modo = m;
    } catch (e) {}
  }

  function salvarModo() {
    try { localStorage.setItem('album-copa-modo', estado.modo); } catch (e) {}
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

  // =================== RENDER: CATÁLOGO (4 MODOS) ===================
  function renderizarCatalogo() {
    const catalogo = document.getElementById('catalogo');
    const figs = aplicarFiltros();

    // Atualiza classe do container baseado no modo
    catalogo.className = 'catalogo catalogo--' + estado.modo;

    // Contador
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

    // Liga event listeners
    catalogo.querySelectorAll('.figurinha').forEach((el) => {
      const id = el.dataset.id;
      // clique no card (atalho de alternar)
      el.addEventListener('click', (e) => {
        if (e.target.closest('.figurinha__btn')) return; // não alterna se clicou em botão
        alternarEstadoRapido(id);
      });
    });
    catalogo.querySelectorAll('.figurinha__btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.closest('.figurinha').dataset.id;
        const target = btn.dataset.estado;
        const atual = estado.estados.get(id);
        // se já tá ativo, remove; senão set
        definirEstado(id, atual === target ? null : target);
      });
    });
  }

  function renderFigurinha(fig) {
    const est = estado.estados.get(fig.id) || '';
    const rarClass = `figurinha__tag--${fig.raridade}`;
    const isEsp = fig.categoria !== 'jogador' && fig.categoria !== 'tecnico';
    const categoriaLabel = fig.categoria ? fig.categoria.charAt(0).toUpperCase() + fig.categoria.slice(1) : '';

    // Layout diferente por modo
    if (estado.modo === 'minimal') {
      return `
        <article class="figurinha" data-id="${fig.id}" data-estado="${est}" data-raridade="${fig.raridade}" title="${escapeHtml(fig.nome)} — ${escapeHtml(fig.selecao || '')}">
          <div class="figurinha__img">
            ${fig.raridade === 'lendaria' ? '<div class="figurinha__selo figurinha__selo--lendaria" title="Lendária">★</div>' : ''}
            <img src="${fig.urlImagem}" alt="${escapeHtml(fig.nome)}" loading="lazy" />
          </div>
        </article>
      `;
    }

    if (estado.modo === 'album') {
      return `
        <article class="figurinha" data-id="${fig.id}" data-estado="${est}" data-raridade="${fig.raridade}" title="${escapeHtml(fig.nome)}">
          <div class="figurinha__img">
            <img src="${fig.urlImagem}" alt="${escapeHtml(fig.nome)}" loading="lazy" />
          </div>
        </article>
      `;
    }

    // detalhada + showcase (full)
    return `
      <article class="figurinha" data-id="${fig.id}" data-estado="${est}" data-raridade="${fig.raridade}">
        ${fig.raridade === 'lendaria' ? '<div class="figurinha__selo figurinha__selo--lendaria" title="Lendária">★</div>' :
          fig.raridade === 'rara' ? '<div class="figurinha__selo figurinha__selo--rara" title="Rara">◆</div>' : ''}
        <div class="figurinha__img">
          <img src="${fig.urlImagem}" alt="${escapeHtml(fig.nome)}" loading="lazy" />
        </div>
        <div class="figurinha__info">
          <span class="figurinha__num">#${String(fig.numero).padStart(3, '0')}</span>
          <h3 class="figurinha__nome">${escapeHtml(fig.nome)}</h3>
          ${!isEsp ? `<span class="figurinha__selecao">${escapeHtml(fig.selecao)}</span>` : ''}
          <div class="figurinha__meta">
            ${fig.raridade !== 'comum' ? `<span class="figurinha__tag ${rarClass}">${fig.raridade}</span>` : ''}
            ${fig.posicao && fig.posicao !== 'ESP' ? `<span class="figurinha__tag">${fig.posicao}</span>` : ''}
            ${fig.grupo && fig.grupo !== 'ESP' ? `<span class="figurinha__tag">Grupo ${fig.grupo}</span>` : ''}
            ${isEsp ? `<span class="figurinha__tag">${categoriaLabel}</span>` : ''}
          </div>
        </div>
        <div class="figurinha__acoes">
          <button class="figurinha__btn ${est === 'tenho' ? 'ativo' : ''}" data-estado="tenho" type="button">Tenho</button>
          <button class="figurinha__btn ${est === 'repetida' ? 'ativo' : ''}" data-estado="repetida" type="button">Repetida</button>
          <button class="figurinha__btn ${est === 'falta' ? 'ativo' : ''}" data-estado="falta" type="button">Falta</button>
        </div>
      </article>
    `;
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

  function ligarModos() {
    document.querySelectorAll('.filtros__modo-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const m = btn.dataset.modo;
        if (!MODOS.includes(m)) return;
        estado.modo = m;
        salvarModo();
        document.querySelectorAll('.filtros__modo-btn').forEach((b) => {
          b.classList.toggle('ativo', b === btn);
          b.setAttribute('aria-selected', b === btn ? 'true' : 'false');
        });
        renderizarCatalogo();
      });
    });
    // marca o botão ativo inicial
    document.querySelectorAll('.filtros__modo-btn').forEach((b) => {
      b.classList.toggle('ativo', b.dataset.modo === estado.modo);
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
    // Desabilita transição durante o toggle (evita bug de cache)
    document.documentElement.style.transition = 'none';
    document.documentElement.setAttribute('data-tema', novo);
    try { localStorage.setItem('album-copa-tema', novo); } catch (e) {}
    // Força reflow + reabilita transição
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

  // =================== INIT ===================
  function init() {
    if (!dados || !dados.figurinhas) {
      console.error('data.js não carregou ou tem formato inválido');
      return;
    }
    carregarTema();
    carregarEstados();
    carregarModo();
    popularFiltros();
    ligarFiltros();
    ligarModos();
    document.getElementById('btn-limpar').addEventListener('click', limparTudo);
    document.getElementById('btn-tema').addEventListener('click', alternarTema);
    renderizarTudo();
    console.log(`✅ Álbum Copa 2026 inicializado: ${dados.total} figurinhas, ${dados.grupos.length} grupos, modo: ${estado.modo}`);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
