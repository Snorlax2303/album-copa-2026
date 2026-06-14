/**
 * app.js — Álbum Copa 2026 v3.0 (simplificado)
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'album-copa-2026-v3';

  const estado = {
    estados: new Map(),
    filtros: {
      busca: '', estado: 'todas', categoria: 'todas', grupo: 'todos',
      selecao: 'todas', posicao: 'todas', raridade: 'todas'
    }
  };

  const dados = window.AlbumCopa.data;
  const CORES_PADRAO = ['#2E7D32', '#FFB300', '#1565C0'];

  function getBandeira(sel) {
    const b = window.AlbumCopa.BANDEIRAS;
    return b ? b[sel] : null;
  }

  function gerarMiniEscudo(cores, tipo, uid) {
    const c1 = cores[0] || '#666', c2 = cores[1] || '#FFF', c3 = cores[2] || '#333';
    let band = '';
    if (tipo === 'faixas-v') {
      band = `<rect x="0" y="0" width="20" height="60" fill="${c1}"/><rect x="20" y="0" width="20" height="60" fill="${c2}"/><rect x="40" y="0" width="20" height="60" fill="${c3}"/>`;
    } else if (tipo === 'cruz') {
      band = `<rect x="0" y="0" width="60" height="60" fill="${c1}"/><rect x="24" y="0" width="12" height="60" fill="${c2}"/><rect x="0" y="24" width="60" height="12" fill="${c2}"/>`;
    } else {
      band = `<rect x="0" y="0" width="60" height="20" fill="${c1}"/><rect x="0" y="20" width="60" height="20" fill="${c2}"/><rect x="0" y="40" width="60" height="20" fill="${c3}"/>`;
    }
    const path = 'M4,8 Q4,4 8,4 L52,4 Q56,4 56,8 L56,40 Q56,56 30,68 Q4,56 4,40 Z';
    const cid = 'ec' + (uid || 'x');
    return `<svg class="fig__escudo" viewBox="0 0 60 70" width="50" height="58">
      <defs><clipPath id="${cid}"><path d="${path}"/></clipPath></defs>
      <g><g clip-path="url(#${cid})"><rect x="0" y="0" width="60" height="70" fill="${c1}"/><g transform="translate(0,5)">${band}</g></g>
      <path d="${path}" fill="none" stroke="#d4af37" stroke-width="0.8"/><path d="${path}" fill="none" stroke="#1a1a1a" stroke-width="1.5"/></g>
    </svg>`;
  }

  function carregarEstados() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const obj = JSON.parse(raw);
      Object.keys(obj).forEach((id) => {
        if (['tenho', 'falta', 'repetida'].includes(obj[id])) estado.estados.set(id, obj[id]);
      });
    } catch (e) {}
  }

  function salvarEstados() {
    try {
      const obj = {};
      estado.estados.forEach((v, id) => { obj[id] = v; });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(obj));
    } catch (e) {}
    // Sync com servidor (fire-and-forget)
    if (window.AlbumSync) {
      window.AlbumSync.enviarParaServidor(estado.estados);
    }
  }

  function definirEstado(id, novoEstado) {
    if (novoEstado === null) estado.estados.delete(id);
    else estado.estados.set(id, novoEstado);
    salvarEstados();
    renderizarTudo();
  }

  function limparTudo() {
    if (!confirm('Apagar TODAS as marcações?')) return;
    estado.estados.clear();
    salvarEstados();
    renderizarTudo();
  }

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

  function escapeHtml(str) {
    if (str == null) return '';
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  // =================== RENDER: DASHBOARD ===================
  function renderizarDashboard() {
    const total = dados.total;
    const tenho = [...estado.estados.values()].filter(v => v === 'tenho').length;
    const falta = [...estado.estados.values()].filter(v => v === 'falta').length;
    const repetida = [...estado.estados.values()].filter(v => v === 'repetida').length;
    const lendarias = dados.figurinhas.filter(f => f.raridade === 'lendaria' && estado.estados.get(f.id) === 'tenho').length;
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

  function renderizarGrafico() {
    const container = document.getElementById('grafico-selecoes');
    const map = new Map();
    let totalTenho = 0;
    dados.figurinhas.forEach((f) => {
      if (!map.has(f.selecao)) map.set(f.selecao, { total: 0, tenho: 0 });
      const e = map.get(f.selecao);
      e.total++;
      if (estado.estados.get(f.id) === 'tenho') { e.tenho++; totalTenho++; }
    });
    const items = [...map.entries()].map(([nome, v]) => ({ nome, ...v, pct: v.total ? (v.tenho / v.total) * 100 : 0 }))
      .sort((a, b) => b.pct - a.pct || a.nome.localeCompare(b.nome));
    const totalSelecoes = [...map.values()].reduce((acc, v) => acc + v.total, 0);
    container.innerHTML = items.map(it => `
      <div class="grafico__item"><div class="grafico__item-header"><span class="grafico__item-nome">${escapeHtml(it.nome)}</span><span class="grafico__item-num">${it.tenho}/${it.total}</span></div>
      <div class="grafico__item-barra"><div class="grafico__item-preench" style="width:${it.pct.toFixed(0)}%"></div></div></div>`).join('');
    const elTotal = document.getElementById('grafico-total');
    if (elTotal) elTotal.textContent = `${totalTenho}/${totalSelecoes}`;
  }

  // =================== POPUP GLOBAL ===================
  let popupIdAtual = null;

  window.abrirPopup = function(figId) {
    const fig = dados.figurinhas.find(f => f.id === figId);
    if (!fig) return;
    popupIdAtual = figId;
    const overlay = document.getElementById('popup-overlay');
    const est = estado.estados.get(figId) || '';
    overlay.innerHTML = `
      <div class="popup-box">
        <div class="popup-header">
          <span class="popup-num">#${String(fig.numero).padStart(3, '0')}</span>
          <span class="popup-nome">${escapeHtml(fig.nome)}</span>
          <button class="popup-fechar" onclick="fecharPopup()">✕</button>
        </div>
        <div class="popup-body">
          <p>${escapeHtml(fig.selecao)} · ${fig.posicao || ''}</p>
        </div>
        <div class="popup-acoes">
          <button class="popup-btn ${est === 'tenho' ? 'ativo ativo-t' : ''}" onclick="marcar('${figId}','tenho')">✓ TENHO</button>
          <button class="popup-btn ${est === 'repetida' ? 'ativo ativo-r' : ''}" onclick="marcar('${figId}','repetida')">↻ REPETIDA</button>
          <button class="popup-btn ${est === 'falta' ? 'ativo ativo-f' : ''}" onclick="marcar('${figId}','falta')">✗ FALTA</button>
          ${est ? '<button class="popup-btn popup-btn-limpar" onclick="marcar(\'' + figId + '\',\'none\')">— LIMPAR</button>' : ''}
        </div>
      </div>`;
    overlay.classList.add('ativo');
  };

  window.fecharPopup = function() {
    document.getElementById('popup-overlay').classList.remove('ativo');
    popupIdAtual = null;
  };

  window.marcar = function(id, estadoNovo) {
    if (estadoNovo === 'none') definirEstado(id, null);
    else {
      const atual = estado.estados.get(id);
      definirEstado(id, atual === estadoNovo ? null : estadoNovo);
    }
    fecharPopup();
  };

  // =================== RENDER: CATÁLOGO ===================
  function renderizarCatalogo() {
    const catalogo = document.getElementById('catalogo');
    const figs = aplicarFiltros();

    document.getElementById('resultado-contador').textContent = figs.length;
    document.getElementById('resultado-total').textContent = dados.total;

    if (!figs.length) {
      catalogo.innerHTML = '<div class="estado-vazio"><p class="estado-vazio__titulo">🔍 Nenhuma figurinha encontrada</p><p>Tente ajustar os filtros.</p></div>';
      return;
    }

    catalogo.innerHTML = figs.map(renderFigurinha).join('');
  }

  function renderFigurinha(fig) {
    const est = estado.estados.get(fig.id) || '';
    const isEsp = fig.categoria !== 'jogador' && fig.categoria !== 'tecnico';
    const labelCat = fig.categoria ? fig.categoria.charAt(0).toUpperCase() + fig.categoria.slice(1) : '';

    const bandeira = getBandeira(fig.selecao);
    const cores = bandeira ? bandeira.cores : CORES_PADRAO;
    const tipo = bandeira ? bandeira.tipo : 'faixas-h';
    const escSvg = gerarMiniEscudo(cores, tipo, fig.id);

    const selo = fig.raridade === 'lendaria' ? '<span class="fig__selo fig__selo--lenda">★</span>'
      : fig.raridade === 'rara' ? '<span class="fig__selo fig__selo--rara">◆</span>' : '';

    const badge = est ? `<span class="fig__badge fig__badge--${est}">${est === 'tenho' ? 'TENHO' : est === 'repetida' ? 'REP' : 'FALTA'}</span>` : '';

    return `<article class="figurinha" data-id="${fig.id}" data-estado="${est}">
      <div class="fig__card" onclick="abrirPopup('${fig.id}')">
        <div class="fig__barra fig__barra--${est || 'none'}"></div>
        <div class="fig__topo">
          <span class="fig__numero">${String(fig.numero).padStart(3, '0')}</span>
          ${selo}${badge}
        </div>
        <div class="fig__meio">${escSvg}</div>
        <div class="fig__info">
          <span class="fig__nome">${escapeHtml(fig.nome)}</span>
          <span class="fig__selecao">${!isEsp ? escapeHtml(fig.selecao) : labelCat}</span>
          ${fig.posicao && fig.posicao !== 'ESP' ? `<span class="fig__posicao">${fig.posicao}</span>` : ''}
        </div>
      </div>
    </article>`;
  }

  // =================== FILTROS ===================
  function popularFiltros() {
    ['categoria', 'grupo', 'selecao', 'posicao'].forEach(id => {
      const el = document.getElementById('filtro-' + id);
      if (!el) return;
      el.innerHTML = '<option value="' + (id === 'grupo' ? 'todos' : 'todas') + '">' + (id === 'grupo' ? 'Todos' : 'Todas') + '</option>';
    });
    (dados.categorias || []).forEach(c => {
      const opt = document.createElement('option'); opt.value = c; opt.textContent = c.charAt(0).toUpperCase() + c.slice(1);
      document.getElementById('filtro-categoria').appendChild(opt);
    });
    dados.grupos.forEach(g => {
      const opt = document.createElement('option'); opt.value = g; opt.textContent = g === 'ESP' ? 'Especiais' : 'Grupo ' + g;
      document.getElementById('filtro-grupo').appendChild(opt);
    });
    const selecoes = [...new Set(dados.figurinhas.filter(f => f.categoria === 'jogador' || f.categoria === 'tecnico').map(f => f.selecao))].sort();
    selecoes.forEach(s => {
      const opt = document.createElement('option'); opt.value = s; opt.textContent = s;
      document.getElementById('filtro-selecao').appendChild(opt);
    });
    dados.posicoes.forEach(p => {
      const opt = document.createElement('option'); opt.value = p; opt.textContent = p === 'ESP' ? 'Especial' : p;
      document.getElementById('filtro-posicao').appendChild(opt);
    });
  }

  function ligarFiltros() {
    ['busca', 'estado', 'categoria', 'grupo', 'selecao', 'posicao', 'raridade'].forEach(id => {
      const el = document.getElementById('filtro-' + id);
      if (!el) return;
      el.addEventListener(id === 'busca' ? 'input' : 'change', () => {
        estado.filtros[id] = el.value;
        renderizarCatalogo();
      });
    });
    document.getElementById('btn-limpar-filtros')?.addEventListener('click', () => {
      estado.filtros = { busca: '', estado: 'todas', categoria: 'todas', grupo: 'todos', selecao: 'todas', posicao: 'todas', raridade: 'todas' };
      document.querySelectorAll('.filtros__grid input, .filtros__grid select').forEach(el => {
        if (el.tagName === 'INPUT') el.value = '';
        else el.value = el.options[0].value;
      });
      renderizarCatalogo();
    });
  }

  function renderizarTudo() {
    renderizarDashboard();
    renderizarGrafico();
    renderizarCatalogo();
  }

  function carregarTema() {
    try {
      const t = localStorage.getItem('album-copa-tema');
      document.documentElement.setAttribute('data-tema', t === 'light' ? 'light' : 'dark');
    } catch (e) { document.documentElement.setAttribute('data-tema', 'dark'); }
    atualizarIconeTema();
  }

  function alternarTema() {
    const atual = document.documentElement.getAttribute('data-tema') || 'dark';
    const novo = atual === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-tema', novo);
    try { localStorage.setItem('album-copa-tema', novo); } catch (e) {}
    atualizarIconeTema();
  }

  function atualizarIconeTema() {
    const atual = document.documentElement.getAttribute('data-tema') || 'dark';
    const lua = document.querySelector('.icone-lua');
    const sol = document.querySelector('.icone-sol');
    if (!lua || !sol) return;
    lua.style.display = atual === 'dark' ? 'block' : 'none';
    sol.style.display = atual === 'light' ? 'block' : 'none';
  }

  function initParticles() {
    const container = document.createElement('div');
    container.className = 'particles';
    document.body.appendChild(container);
    const count = Math.min(Math.floor(window.innerWidth / 30), 40);
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      p.style.cssText = `left:${Math.random()*100}%;top:${Math.random()*100}%;width:${1+Math.random()*2.5}px;height:${1+Math.random()*2.5}px;animation:float-particle ${15+Math.random()*25}s ${Math.random()*20}s infinite ease-in-out;opacity:${0.1+Math.random()*0.15}`;
      container.appendChild(p);
    }
  }

  function initMotionAnimations() {
    if (typeof Motion === 'undefined') return;
    // Header fade
    document.querySelectorAll('.cabecalho__container > *').forEach((el, i) => {
      Motion.animate(el, { opacity: [0, 1], y: [-10, 0] }, {
        duration: 0.6, delay: Motion.stagger(0.1, { from: i }), easing: [0.16, 1, 0.3, 1]
      });
    });
    // Dashboard cards stagger
    const cards = document.querySelectorAll('.dashboard .card');
    cards.forEach((card, i) => {
      Motion.animate(card, { opacity: [0, 1], y: [12, 0] }, {
        duration: 0.5, delay: Motion.stagger(0.04, { from: i }), easing: [0.16, 1, 0.3, 1]
      });
      // Hover nos cards
      Motion.hover(card, {
        onEnter: () => Motion.animate(card, { y: -2 }, { duration: 0.2, easing: [0.16,1,0.3,1] }),
        onLeave: () => Motion.animate(card, { y: 0 }, { duration: 0.2, easing: [0.16,1,0.3,1] })
      });
    });
    // Filtros stagger
    document.querySelectorAll('.filtros .campo').forEach((el, i) => {
      Motion.animate(el, { opacity: [0, 1], y: [8, 0] }, {
        duration: 0.4, delay: Motion.stagger(0.03, { from: i }), easing: [0.16, 1, 0.3, 1]
      });
    });
  }

  // Patch no renderCatalogo pra animar os cards novos
  const _origRender = renderizarCatalogo;
  renderizarCatalogo = function() {
    _origRender();
    // Animar figurinhas com Motion
    if (typeof Motion !== 'undefined') {
      const figs = document.querySelectorAll('.figurinha');
      figs.forEach((el, i) => {
        Motion.animate(el, { opacity: [0, 1], y: [8, 0] }, {
          duration: 0.3, delay: Motion.stagger(0.015, { from: i }), easing: [0.16, 1, 0.3, 1]
        });
        // Hover sutil
        Motion.hover(el, {
          onEnter: () => Motion.animate(el, { y: -2, scale: 1.01 }, { duration: 0.2 }),
          onLeave: () => Motion.animate(el, { y: 0, scale: 1 }, { duration: 0.2 })
        });
      });
    }
  };

  window.getBandeira = getBandeira;

  function init() {
    if (!dados || !dados.figurinhas) { console.error('data.js não carregou'); return; }
    carregarTema();
    carregarEstados();
    popularFiltros();
    ligarFiltros();
    initParticles();
    document.getElementById('btn-limpar')?.addEventListener('click', limparTudo);
    document.getElementById('btn-tema')?.addEventListener('click', alternarTema);
    initMotionAnimations();
    renderizarTudo();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
