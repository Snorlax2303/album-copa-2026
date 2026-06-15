/**
 * sync.js v2 — Sincronizador do Álbum Copa 2026
 * 
 * CORREÇÃO: Servidor como ÚNICA fonte da verdade.
 * Ao syncar, o servidor retorna o estado completo.
 * O cliente ACEITA o que veio do servidor (sobrescreve local).
 * Só envia pro servidor quando o USUÁRIO marca/desmarca algo.
 * 
 * Estratégia:
 * - Ao carregar: puxa do servidor → sobrescreve localStorage
 * - Ao marcar/desmarcar: envia pro servidor → servidor processa → retorna estado limpo
 * - Polling 30s: servidor é a verdade, cliente adapta
 */
(function() {
  'use strict';

  const STORAGE_KEY = 'album-copa-2026-v3';
  const SERVER_URL = 'https://sync.velhaturbo.cloud';
  const PASSKEY = 'da60a304b4c7';

  // ============== STATUS ==============

  let status = 'offline';
  let ultimoSyncTimestamp = null;
  let ultimoSyncTextoRel = '—';
  let callbacks = [];

  function setStatus(novo, ts) {
    status = novo;
    if (ts) ultimoSyncTimestamp = ts;
    atualizarIndicador();
    callbacks.forEach(cb => cb(status, ultimoSyncTextoRel));
  }

  function onStatusChange(cb) {
    callbacks.push(cb);
  }

  // ============== LEITURA LOCAL ==============

  function carregarLocal() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return {};
      const obj = JSON.parse(raw);
      // Filtrar só estados válidos
      const limpo = {};
      Object.keys(obj).forEach(id => {
        if (['tenho', 'repetida'].includes(obj[id])) limpo[id] = obj[id];
      });
      return limpo;
    } catch(e) { return {}; }
  }

  function salvarLocal(estados) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(estados));
    } catch(e) {}
  }

  // ============== TIME HELPER ==============

  function timeAgo(ts) {
    if (!ts) return '—';
    const diff = Math.floor((Date.now() - ts) / 1000);
    if (diff < 5) return 'agora';
    if (diff < 60) return `há ${diff}s`;
    const min = Math.floor(diff / 60);
    if (min < 60) return `há ${min}min`;
    return `há ${Math.floor(min / 60)}h`;
  }

  // ============== SYNC (NOVO FLUXO) ==============

  let ultimoSync = 0;
  const MIN_SYNC_INTERVAL = 3000;

  /**
   * Puxa do servidor e sobrescreve o localStorage local.
   * Usado no polling e no init.
   */
  async function puxarDoServidor() {
    const agora = Date.now();
    if (agora - ultimoSync < MIN_SYNC_INTERVAL) return null;
    ultimoSync = agora;

    setStatus('syncing');

    try {
      const resp = await fetch(SERVER_URL + '/estados', {
        signal: AbortSignal.timeout(8000)
      });
      if (!resp.ok) throw new Error('HTTP ' + resp.status);
      const data = await resp.json();
      if (!data.ok) throw new Error('API error');

      const serverEstados = data.estados || {};

      // Servidor é a verdade: sobrescreve localStorage
      const local = carregarLocal();

      // Mescla: o que está no servidor tem prioridade
      // O que está no local e NÃO está no servidor → se o servidor não tem, é porque foi removido → mantém removido
      const merged = { ...local };

      let mudou = false;
      Object.keys(serverEstados).forEach(id => {
        if (merged[id] !== serverEstados[id]) {
          merged[id] = serverEstados[id];
          mudou = true;
        }
      });

      // Remove do local o que foi removido do servidor
      Object.keys(merged).forEach(id => {
        if (!serverEstados[id] && ['tenho', 'repetida'].includes(local[id])) {
          delete merged[id];
          mudou = true;
        }
      });

      if (mudou) {
        salvarLocal(merged);
        // Dispara evento pra página atualizar
        window.dispatchEvent(new CustomEvent('album-sync', { detail: { estados: merged } }));
      }

      const now = Date.now();
      ultimoSyncTimestamp = now;
      ultimoSyncTextoRel = 'agora';
      setStatus('online', now);

      return data;
    } catch(e) {
      ultimoSyncTimestamp = agora;
      ultimoSyncTextoRel = timeAgo(agora);
      setStatus('offline');
      return null;
    }
  }

  /**
   * Envia marcação/desmarcação pro servidor.
   * Só chama quando o usuário INTERAGE (clicou numa figurinha).
   * O servidor processa e retorna o estado limpo → cliente aceita.
   */
  async function enviarMarcacao(figId, novoEstado) {
    try {
      setStatus('syncing');

      const payload = {};
      if (novoEstado && ['tenho', 'repetida'].includes(novoEstado)) {
        payload[figId] = novoEstado;
      } else {
        // Se não tem estado, manda null pra remover do servidor
        payload[figId] = null;
      }

      const resp = await fetch(SERVER_URL + '/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passkey: PASSKEY, estados: payload }),
        signal: AbortSignal.timeout(8000)
      });

      if (!resp.ok) throw new Error('HTTP ' + resp.status);
      const data = await resp.json();
      if (!data.ok) throw new Error('API error');

      // Servidor retornou o estado completo → sobrescreve local
      if (data.estados) {
        const local = carregarLocal();
        const merged = { ...local };

        // O que o servidor tem = verdade
        Object.keys(data.estados).forEach(id => {
          merged[id] = data.estados[id];
        });

        // Remove do local o que não está mais no servidor
        Object.keys(merged).forEach(id => {
          if (!data.estados[id]) {
            delete merged[id];
          }
        });

        salvarLocal(merged);
        window.dispatchEvent(new CustomEvent('album-sync', { detail: { estados: merged } }));
      }

      const now = Date.now();
      ultimoSyncTimestamp = now;
      ultimoSyncTextoRel = 'agora';
      setStatus('online', now);
      return true;
    } catch(e) {
      setStatus('offline');
      return false;
    }
  }

  /**
   * Envia TODOS os estados locais pro servidor (forçar sync completo)
   */
  async function enviarTudo() {
    try {
      setStatus('syncing');
      const local = carregarLocal();

      const resp = await fetch(SERVER_URL + '/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passkey: PASSKEY, estados: local }),
        signal: AbortSignal.timeout(8000)
      });

      if (!resp.ok) throw new Error('HTTP ' + resp.status);
      const data = await resp.json();
      if (!data.ok) throw new Error('API error');

      // Servidor é a verdade
      if (data.estados) {
        salvarLocal(data.estados);
        window.dispatchEvent(new CustomEvent('album-sync', { detail: { estados: data.estados } }));
      }

      const now = Date.now();
      ultimoSyncTimestamp = now;
      ultimoSyncTextoRel = 'agora';
      setStatus('online', now);
      return true;
    } catch(e) {
      setStatus('offline');
      return false;
    }
  }

  // ============== INDICADOR VISUAL ==============

  function criarIndicador(container) {
    if (!container) return;
    if (document.getElementById('sync-indicator')) return;

    const wrapper = document.createElement('div');
    wrapper.id = 'sync-indicator';
    wrapper.style.cssText = `
      display: inline-flex; align-items: center; gap: 0.5rem;
      font-family: 'JetBrains Mono', monospace; font-size: 0.55rem;
      letter-spacing: 0.05em; color: var(--texto-secundario, rgba(240,237,232,0.35));
      margin-left: auto;
    `;

    const dot = document.createElement('span');
    dot.id = 'sync-dot';
    dot.style.cssText = `
      width: 6px; height: 6px; border-radius: 50%;
      display: inline-block; flex-shrink: 0;
      background: #ef5350; transition: background 0.4s cubic-bezier(0.16,1,0.3,1);
    `;
    wrapper.appendChild(dot);

    const label = document.createElement('span');
    label.id = 'sync-label';
    label.textContent = 'offline';
    label.style.cssText = `font-size: 0.55rem; text-transform: uppercase; letter-spacing: 0.08em;`;
    wrapper.appendChild(label);

    const sep = document.createElement('span');
    sep.textContent = '·';
    sep.style.cssText = `opacity: 0.3;`;
    wrapper.appendChild(sep);

    const timeEl = document.createElement('span');
    timeEl.id = 'sync-time';
    timeEl.textContent = ultimoSyncTextoRel || '—';
    wrapper.appendChild(timeEl);

    const btnSyncEl = document.createElement('button');
    btnSyncEl.id = 'btn-forcar-sync';
    btnSyncEl.textContent = '↻';
    btnSyncEl.title = 'Sincronizar agora';
    btnSyncEl.style.cssText = `
      background: none; border: 1px solid rgba(255,255,255,0.08);
      color: rgba(240,237,232,0.3); cursor: pointer;
      padding: 0.15rem 0.4rem; font-size: 0.7rem; line-height: 1;
      transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
      font-family: inherit;
    `;
    btnSyncEl.addEventListener('click', () => {
      btnSyncEl.style.transform = 'rotate(360deg)';
      btnSyncEl.style.transition = 'transform 0.5s cubic-bezier(0.16,1,0.3,1)';
      enviarTudo().then(() => {
        setTimeout(() => {
          btnSyncEl.style.transition = 'transform 0.3s cubic-bezier(0.16,1,0.3,1)';
          btnSyncEl.style.transform = 'rotate(0deg)';
        }, 600);
      });
    });
    wrapper.appendChild(btnSyncEl);

    container.appendChild(wrapper);

    if (typeof Motion !== 'undefined') {
      Motion.animate(wrapper, { opacity: [0, 1] }, { duration: 0.4, easing: [0.16,1,0.3,1], delay: 0.8 });
    }
  }

  function atualizarIndicador() {
    const dot = document.getElementById('sync-dot');
    const label = document.getElementById('sync-label');
    if (!dot || !label) return;

    dot.style.cssText = `
      width: 6px; height: 6px; border-radius: 50%;
      display: inline-block; flex-shrink: 0;
      transition: all 0.4s cubic-bezier(0.16,1,0.3,1);
    `;

    if (status === 'online') {
      dot.style.background = '#4caf50';
      dot.style.boxShadow = '0 0 6px rgba(76,175,80,0.4)';
      label.textContent = 'online';
      label.style.color = 'rgba(76,175,80,0.7)';
    } else if (status === 'syncing') {
      dot.style.background = '#ff9800';
      dot.style.boxShadow = '0 0 6px rgba(255,152,0,0.4)';
      dot.style.animation = 'sync-pulse 0.8s ease-in-out infinite';
      label.textContent = 'sync';
      label.style.color = 'rgba(255,152,0,0.7)';
    } else {
      dot.style.background = '#ef5350';
      label.textContent = 'offline';
      label.style.color = 'rgba(239,83,80,0.5)';
    }

    const timeEl = document.getElementById('sync-time');
    if (timeEl) {
      atualizarTimeAgo();
      timeEl.textContent = ultimoSyncTextoRel || '—';
    }
  }

  function atualizarTimeAgo() {
    if (ultimoSyncTimestamp) {
      ultimoSyncTextoRel = timeAgo(ultimoSyncTimestamp);
    }
  }

  // ============== CSS DA ANIMAÇÃO ==============

  function injectAnimCSS() {
    if (document.getElementById('sync-anim-css')) return;
    const style = document.createElement('style');
    style.id = 'sync-anim-css';
    style.textContent = `
      @keyframes sync-pulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.5; transform: scale(1.3); }
      }
      #btn-forcar-sync:hover {
        border-color: rgba(255,255,255,0.15) !important;
        color: rgba(240,237,232,0.6) !important;
      }
    `;
    document.head.appendChild(style);
  }

  // ============== INTERCEPTAR MARCAÇÕES ==============

  /**
   * Hook: app.js chama isso quando o usuário marca uma figurinha.
   * Em vez de sync.js fazer polling burro, ele ESPERA o usuário agir.
   */
  function marcar(figId, estado) {
    // Salva local primeiro (instantâneo pro usuário)
    const local = carregarLocal();
    if (estado && ['tenho', 'repetida'].includes(estado)) {
      local[figId] = estado;
    } else {
      delete local[figId];
    }
    salvarLocal(local);

    // Manda pro servidor (fire-and-forget, mas com retry)
    enviarMarcacao(figId, estado);
  }

  // ============== EXPOR API GLOBAL ==============

  window.AlbumSync = {
    carregarLocal,
    salvarLocal,
    puxarDoServidor,
    enviarMarcacao,
    enviarTudo,
    criarIndicador,
    onStatusChange,
    marcar,
    SERVER_URL,
    STORAGE_KEY,
    getStatus: () => status,
    ultimoSyncTexto: () => ultimoSyncTextoRel
  };

  // ============== AUTO INIT ==============

  injectAnimCSS();

  function init() {
    // No init: puxa do servidor e sobrescreve local
    puxarDoServidor();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    setTimeout(init, 500);
  }

  // Polling a cada 30s — servidor é a verdade
  setInterval(() => {
    puxarDoServidor();
  }, 30000);

  // Atualizar texto "há X tempo" a cada 15s
  setInterval(() => {
    atualizarTimeAgo();
    const el = document.getElementById('sync-time');
    if (el) el.textContent = ultimoSyncTextoRel;
  }, 15000);

})();
