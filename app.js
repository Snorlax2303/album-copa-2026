/**
 * app.js — Álbum Copa 2026
 *
 * Funcionalidades:
 *   - CRUD dos 3 estados (Tenho / Falta / Repetida) por figurinha
 *   - Persistência no localStorage (chave: album-copa-2026-v1)
 *   - Filtros combinados (busca, estado, grupo, seleção, posição, raridade)
 *   - Dashboard com cards de estatísticas e barra de progresso
 *   - Gráfico de progresso por seleção (CSS bars)
 *
 * Arquitetura: vanilla JS sem framework. Tudo modular dentro de IIFE.
 */
(function () {
  'use strict';

  // =================== CONSTANTES ===================
  const STORAGE_KEY = 'album-copa-2026-v1';

  // =================== ESTADO GLOBAL ===================
  /**
   * estados: Map<id, 'tenho' | 'falta' | 'repetida'>
   * filtros: objeto com os valores atuais dos filtros
   */
  const estado = {
    estados: new Map(),
    filtros: {
      busca: '',
      estado: 'todas',
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
        // valida o valor lido
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
      estado.estados.forEach((valor, id) => {
        obj[id] = valor;
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(obj));
    } catch (err) {
      console.warn('Falha ao salvar no localStorage:', err);
    }
  }

  function limparTudo() {
    if (!confirm('Tem certeza? Isso apaga TODAS as marcações do álbum.')) return;
    estado.estados.clear();
    salvarEstados();
    renderizarTudo();
  }

  // =================== CRUD DE ESTADO ===================
  function definirEstado(id, novoEstado) {
    if (novoEstado === null) {
      estado.estados.delete(id);
    } else {
      estado.estados.set(id, novoEstado);
    }
    salvarEstados();
    // re-renderiza: o card mudou, as estatísticas também
    renderizarTudo();
  }

  /**
   * Alterna ciclicamente: nada → tenho → repetida → falta → nada
   * Acionado pelo clique no card (atalho).
   */
  function alternarEstadoRapido(id) {
    const atual = estado.estados.get(id);
    const ciclo = ['tenho', 'repetida', 'falta'];
    const proximoIdx = atual ? (ciclo.indexOf(atual) + 1) % ciclo.length : 0;
    // se passou do último, volta para "nada" (remove)
    if (atual && ciclo.indexOf(atual) === ciclo.length - 1 && proximoIdx === 0) {
      definirEstado(id, null);
    } else {
      definirEstado(id, ciclo[proximoIdx]);
    }
  }

  // =================== FILTRAGEM ===================
  function figurinhasFiltradas() {
    const f = estado.filtros;
    const termo = f.busca.trim().toLowerCase();

    return dados.figurinhas.filter((fig) => {
      // 1) busca textual (nome OU seleção)
      if (termo) {
        const matchNome = fig.nome.toLowerCase().includes(termo);
        const matchSelecao = fig.selecao.toLowerCase().includes(termo);
        if (!matchNome && !matchSelecao) return false;
      }
      // 2) estado
      if (f.estado !== 'todas') {
        const estadoFig = estado.estados.get(fig.id) || 'falta';
        if (estadoFig !== f.estado) return false;
      }
      // 3) grupo
      if (f.grupo !== 'todos' && fig.grupo !== f.grupo) return false;
      // 4) seleção
      if (f.selecao !== 'todas' && fig.selecao !== f.selecao) return false;
      // 5) posição
      if (f.posicao !== 'todas' && fig.posicao !== f.posicao) return false;
      // 6) raridade
      if (f.raridade !== 'todas' && fig.raridade !== f.raridade) return false;
      return true;
    });
  }

  // =================== RENDERIZAÇÃO ===================
  function renderizarGrid() {
    const container = document.getElementById('grid-figurinhas');
    const vazio = document.getElementById('mensagem-vazia');
    const lista = figurinhasFiltradas();

    // contador no rodapé dos filtros
    document.getElementById('contador-filtradas').textContent =
      'Mostrando ' + lista.length + ' de ' + dados.total + ' figurinhas';

    if (lista.length === 0) {
      container.innerHTML = '';
      vazio.hidden = false;
      return;
    }
    vazio.hidden = true;

    // monta o HTML de uma vez (performance)
    const html = lista.map(criarHtmlFigurinha).join('');
    container.innerHTML = html;

    // anexa event listeners nos botões
    lista.forEach((fig) => {
      const card = container.querySelector('[data-id="' + fig.id + '"]');
      if (!card) return;
      card.querySelector('.figurinha__btn--tenho')
        .addEventListener('click', () => definirEstado(fig.id, 'tenho'));
      card.querySelector('.figurinha__btn--falta')
        .addEventListener('click', () => definirEstado(fig.id, 'falta'));
      card.querySelector('.figurinha__btn--repetida')
        .addEventListener('click', () => definirEstado(fig.id, 'repetida'));
      // clique na imagem = alterna rápido
      card.querySelector('.figurinha__imagem')
        .addEventListener('click', () => alternarEstadoRapido(fig.id));
    });
  }

  function criarHtmlFigurinha(fig) {
    const estadoFig = estado.estados.get(fig.id) || 'falta';
    const classeBadge = 'figurinha__badge--' + fig.raridade;
    const labelRaridade = fig.raridade.charAt(0).toUpperCase() + fig.raridade.slice(1);

    return `
<article class="figurinha" data-id="${fig.id}" data-estado="${estadoFig}">
  <img class="figurinha__imagem" src="${fig.urlImagem}" alt="${fig.nome} - ${fig.selecao}" loading="lazy" />
  <span class="figurinha__badge ${classeBadge}">${labelRaridade}</span>
  <div class="figurinha__corpo">
    <h3 class="figurinha__nome">${fig.nome}</h3>
    <div class="figurinha__meta">
      <span>${fig.selecao}</span>
      <span>Grupo ${fig.grupo} · ${fig.posicao}</span>
    </div>
    <div class="figurinha__acoes" role="group" aria-label="Estado da figurinha ${fig.nome}">
      <button class="figurinha__btn figurinha__btn--tenho ${estadoFig === 'tenho' ? 'figurinha__btn--ativo' : ''}" type="button">Tenho</button>
      <button class="figurinha__btn figurinha__btn--repetida ${estadoFig === 'repetida' ? 'figurinha__btn--ativo' : ''}" type="button">Repetida</button>
      <button class="figurinha__btn figurinha__btn--falta ${estadoFig === 'falta' ? 'figurinha__btn--ativo' : ''}" type="button">Falta</button>
    </div>
  </div>
</article>`;
  }

  function renderizarEstatisticas() {
    let tenho = 0, falta = 0, repetida = 0;
    estado.estados.forEach((v) => {
      if (v === 'tenho') tenho++;
      else if (v === 'falta') falta++;
      else if (v === 'repetida') repetida++;
    });
    // as figurinhas que nunca foram tocadas contam como "falta" para o dashboard
    const semEstado = dados.total - estado.estados.size;
    const totalFalta = falta + semEstado;
    const totalPosse = tenho + repetida; // o usuário "tem" ambas, repetida conta como posse
    const percentual = dados.total === 0 ? 0 : Math.round((totalPosse / dados.total) * 100);

    document.getElementById('stat-total').textContent = dados.total;
    document.getElementById('stat-tenho').textContent = tenho;
    document.getElementById('stat-falta').textContent = totalFalta;
    document.getElementById('stat-repetida').textContent = repetida;
    document.getElementById('stat-percentual').textContent = percentual + '%';
    document.getElementById('stat-concluidas').textContent =
      totalPosse + ' de ' + dados.total + ' figurinhas';
    document.getElementById('barra-progresso-preenchimento').style.width = percentual + '%';
  }

  function renderizarGrafico() {
    const container = document.getElementById('grafico-selecoes');
    // agrupa figurinhas por seleção
    const grupos = {};
    dados.figurinhas.forEach((f) => {
      if (!grupos[f.selecao]) grupos[f.selecao] = { total: 0, tenho: 0, repetida: 0 };
      grupos[f.selecao].total++;
      const e = estado.estados.get(f.id);
      if (e === 'tenho') grupos[f.selecao].tenho++;
      if (e === 'repetida') grupos[f.selecao].repetida++;
    });

    // ordena por % de conclusão desc
    const ordenado = Object.keys(grupos)
      .map((sel) => ({
        selecao: sel,
        total: grupos[sel].total,
        obtido: grupos[sel].tenho + grupos[sel].repetida
      }))
      .sort((a, b) => {
        const pa = a.total ? a.obtido / a.total : 0;
        const pb = b.total ? b.obtido / b.total : 0;
        return pb - pa;
      });

    container.innerHTML = ordenado.map((g) => {
      const pct = g.total ? Math.round((g.obtido / g.total) * 100) : 0;
      return `
<div class="grafico-linha">
  <span class="grafico-linha__nome">${g.selecao}</span>
  <div class="grafico-linha__barra">
    <div class="grafico-linha__preenchimento" style="width:${pct}%"></div>
  </div>
  <span class="grafico-linha__contador">${g.obtido}/${g.total}</span>
</div>`;
    }).join('');
  }

  function renderizarTudo() {
    renderizarGrid();
    renderizarEstatisticas();
    renderizarGrafico();
  }

  // =================== POPULAR SELECTS ===================
  function popularSelects() {
    popularSelect('filtro-grupo', dados.grupos);
    popularSelect('filtro-posicao', dados.posicoes);

    // seleções únicas, ordenadas alfabeticamente
    const selecoes = Array.from(new Set(dados.figurinhas.map((f) => f.selecao))).sort();
    popularSelect('filtro-selecao', selecoes);
  }

  function popularSelect(id, valores) {
    const sel = document.getElementById(id);
    // remove opções dinâmicas (mantém a primeira "Todos")
    while (sel.options.length > 1) sel.remove(1);
    valores.forEach((v) => {
      const opt = document.createElement('option');
      opt.value = v;
      // formata: lendaria -> Lendária
      opt.textContent = v.charAt(0).toUpperCase() + v.slice(1);
      sel.appendChild(opt);
    });
  }

  // =================== EVENT LISTENERS ===================
  function configurarEventos() {
    document.getElementById('filtro-busca')
      .addEventListener('input', (e) => {
        estado.filtros.busca = e.target.value;
        renderizarGrid();
      });
    document.getElementById('filtro-estado')
      .addEventListener('change', (e) => {
        estado.filtros.estado = e.target.value;
        renderizarGrid();
      });
    document.getElementById('filtro-grupo')
      .addEventListener('change', (e) => {
        estado.filtros.grupo = e.target.value;
        renderizarGrid();
      });
    document.getElementById('filtro-selecao')
      .addEventListener('change', (e) => {
        estado.filtros.selecao = e.target.value;
        renderizarGrid();
      });
    document.getElementById('filtro-posicao')
      .addEventListener('change', (e) => {
        estado.filtros.posicao = e.target.value;
        renderizarGrid();
      });
    document.getElementById('filtro-raridade')
      .addEventListener('change', (e) => {
        estado.filtros.raridade = e.target.value;
        renderizarGrid();
      });

    document.getElementById('btn-resetar-filtros')
      .addEventListener('click', () => {
        estado.filtros = {
          busca: '',
          estado: 'todas',
          grupo: 'todos',
          selecao: 'todas',
          posicao: 'todas',
          raridade: 'todas'
        };
        document.getElementById('filtro-busca').value = '';
        document.getElementById('filtro-estado').value = 'todas';
        document.getElementById('filtro-grupo').value = 'todos';
        document.getElementById('filtro-selecao').value = 'todas';
        document.getElementById('filtro-posicao').value = 'todas';
        document.getElementById('filtro-raridade').value = 'todas';
        renderizarGrid();
      });

    document.getElementById('btn-limpar')
      .addEventListener('click', limparTudo);
  }

  // =================== INICIALIZAÇÃO ===================
  function init() {
    carregarEstados();
    popularSelects();
    configurarEventos();
    renderizarTudo();
    console.info('Álbum Copa 2026 carregado: ' + dados.total + ' figurinhas no catálogo.');
  }

  // exposto para debug
  window.AlbumCopa = window.AlbumCopa || {};
  window.AlbumCopa.app = { estado, dados, definirEstado, limparTudo };

  // dispara quando o DOM estiver pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
