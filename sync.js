/**
 * sync.js — Sincronizador do Álbum Copa 2026
 * 
 * Estratégia: localStorage como fonte primária (offline-first)
 * Servidor como backup/sync (online)
 * 
 * Inclui: indicador visual de status + botão sync + Motion animations
 */

(function() {
  'use strict';

  const STORAGE_KEY = 'album-copa-2026-v3';
  const SERVER_URL = 'https://sync.velhaturbo.cloud';
  const PASSKEY = 'da60a304b4c7';

  // ============== STATUS ==============

  let status = 'offline';   // 'offline' | 'syncing' | 'online'
  let ultimoSyncTimestamp = null;
  let ultimoSyncTexto = '—';
  let estadoAtual = null;
  let callbacks = [];

  function setStatus(novo, ts) {
    status = novo;
    if (ts) ultimoSyncTimestamp = ts;
    atualizarIndicador();
    callbacks.forEach(cb => cb(status, ultimoSyncTexto));
  }

  function onStatusChange(cb) {
    callbacks.push(cb);
  }

  // ============== LEITURA LOCAL ==============

  function carregarLocal() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return new Map();
      const obj = JSON.parse(raw);
      const map = new Map();
      Object.keys(obj).forEach(id => {
        if (['tenho', 'falta', 'repetida'].includes(obj[id])) map.set(id, obj[id]);
      });
      return map;
    } catch(e) { return new Map(); }
  }

  // ============== SALVAR LOCAL ==============

  function salvarLocal(estados) {
    try {
      const obj = {};
      estados.forEach((v, id) => { obj[id] = v; });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(obj));
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
    const h = Math.floor(min / 60);
    if (h < 24) return `há ${h}h`;
    return `há ${Math.floor(h / 24)}d`;
  }

  function atualizarTimeAgo() {
    if (ultimoSyncTimestamp) {
      ultimoSyncTexto = timeAgo(ultimoSyncTimestamp);
    }
  }

  // ============== SYNC ==============

  let ultimoSync = 0;
  const MIN_SYNC_INTERVAL = 5000;

  async function syncComServidor(estadosLocais, forcar) {
    const agora = Date.now();
    if (!forcar && agora - ultimoSync < MIN_SYNC_INTERVAL) return null;
    ultimoSync = agora;

    setStatus('syncing');
    estadoAtual = estadosLocais;

    try {
      const payload = {};
      estadosLocais.forEach((v, id) => {
        if (v === 'tenho' || v === 'repetida') payload[id] = v;
      });

      const resp = await fetch(SERVER_URL + '/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passkey: PASSKEY, estados: payload }),
        signal: AbortSignal.timeout(8000)
      });

      if (!resp.ok) throw new Error('HTTP ' + resp.status);
      const data = await resp.json();
      if (!data.ok) throw new Error('API error');

      // Merge: o que veio do servidor E não tem no local = adicionar
      let mudou = false;
      if (data.estados) {
        Object.keys(data.estados).forEach(id => {
          if (!estadosLocais.has(id)) {
            estadosLocais.set(id, data.estados[id]);
            mudou = true;
          }
        });
      }

      const now = Date.now();
      ultimoSyncTimestamp = now;
      ultimoSyncTexto = 'agora';
      setStatus('online', now);

      if (mudou) {
        salvarLocal(estadosLocais);
        window.dispatchEvent(new CustomEvent('album-sync', { detail: { estados: Object.fromEntries(estadosLocais) } }));
      }

      return data;
    } catch(e) {
      ultimoSyncTimestamp = agora;
      ultimoSyncTexto = timeAgo(agora);
      setStatus('offline');
      return null;
    }
  }

  async function enviarParaServidor(estados) {
    try {
      const payload = {};
      estados.forEach((v, id) => {
        if (v === 'tenho' || v === 'repetida') payload[id] = v;
      });
      
      await fetch(SERVER_URL + '/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passkey: PASSKEY, estados: payload }),
        signal: AbortSignal.timeout(5000)
      });
      const now = Date.now();
      ultimoSyncTimestamp = now;
      ultimoSyncTexto = 'agora';
      if (status !== 'online') setStatus('online', now);
    } catch(e) {}
  }

  // ============== INDICADOR VISUAL ==============

  let indicadorEl = null;
  let btnSyncEl = null;
  let timeEl = null;

  function criarIndicador(container) {
    if (!container) return;

    // Só criar se não existir ainda
    if (document.getElementById('sync-indicator')) return;

    const wrapper = document.createElement('div');
    wrapper.id = 'sync-indicator';
    wrapper.style.cssText = `
      display: inline-flex; align-items: center; gap: 0.5rem;
      font-family: 'JetBrains Mono', monospace; font-size: 0.55rem;
      letter-spacing: 0.05em; color: var(--texto-secundario, rgba(240,237,232,0.35));
      margin-left: auto;
    `;

    // Dot de status
    const dot = document.createElement('span');
    dot.id = 'sync-dot';
    dot.style.cssText = `
      width: 6px; height: 6px; border-radius: 50%;
      display: inline-block; flex-shrink: 0;
      background: #ef5350; transition: background 0.4s cubic-bezier(0.16,1,0.3,1);
    `;
    wrapper.appendChild(dot);

    // Label do status
    const label = document.createElement('span');
    label.id = 'sync-label';
    label.textContent = 'offline';
    label.style.cssText = `font-size: 0.55rem; text-transform: uppercase; letter-spacing: 0.08em;`;
    wrapper.appendChild(label);

    // Separador
    const sep = document.createElement('span');
    sep.textContent = '·';
    sep.style.cssText = `opacity: 0.3;`;
    wrapper.appendChild(sep);

    // Último sync
    timeEl = document.createElement('span');
    timeEl.id = 'sync-time';
    timeEl.textContent = ultimoSyncTexto || '—';
    wrapper.appendChild(timeEl);

    // Botão Sync
    btnSyncEl = document.createElement('button');
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
    btnSyncEl.addEventListener('click', forcarSync);
    wrapper.appendChild(btnSyncEl);

    container.appendChild(wrapper);

    // Animar entrada com Motion
    if (typeof Motion !== 'undefined') {
      Motion.animate(wrapper, { opacity: [0, 1] }, { duration: 0.4, easing: [0.16,1,0.3,1], delay: 0.8 });
    }
  }

  function atualizarIndicador() {
    atualizarTimeAgo();

    const dot = document.getElementById('sync-dot');
    const label = document.getElementById('sync-label');
    if (!dot || !label) return;

    // Remover classes antigas
    dot.className = '';
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
      if (btnSyncEl) {
        btnSyncEl.style.borderColor = 'rgba(76,175,80,0.2)';
        btnSyncEl.style.color = 'rgba(76,175,80,0.5)';
      }
    } else if (status === 'syncing') {
      dot.style.background = '#ff9800';
      dot.style.boxShadow = '0 0 6px rgba(255,152,0,0.4)';
      dot.style.animation = 'sync-pulse 0.8s ease-in-out infinite';
      label.textContent = 'sync';
      label.style.color = 'rgba(255,152,0,0.7)';
      if (btnSyncEl) {
        btnSyncEl.style.borderColor = 'rgba(255,152,0,0.2)';
        btnSyncEl.style.color = 'rgba(255,152,0,0.5)';
        btnSyncEl.style.transform = 'rotate(180deg)';
      }
    } else {
      dot.style.background = '#ef5350';
      label.textContent = 'offline';
      label.style.color = 'rgba(239,83,80,0.5)';
      if (btnSyncEl) {
        btnSyncEl.style.borderColor = 'rgba(255,255,255,0.08)';
        btnSyncEl.style.color = 'rgba(240,237,232,0.25)';
        btnSyncEl.style.transform = 'rotate(0deg)';
      }
    }

    if (timeEl) {
      timeEl.textContent = ultimoSyncTexto || '—';
    }
  }

  async function forcarSync() {
    if (btnSyncEl) {
      btnSyncEl.style.transform = 'rotate(360deg)';
      btnSyncEl.style.transition = 'transform 0.5s cubic-bezier(0.16,1,0.3,1)';
    }
    const estados = carregarLocal();
    await syncComServidor(estados, true);
    // Reset botão
    setTimeout(() => {
      if (btnSyncEl) {
        btnSyncEl.style.transition = 'transform 0.3s cubic-bezier(0.16,1,0.3,1)';
        btnSyncEl.style.transform = status === 'syncing' ? 'rotate(180deg)' : 'rotate(0deg)';
      }
    }, 600);
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

  // ============== EXPOR API GLOBAL ==============

  window.AlbumSync = {
    carregarLocal,
    salvarLocal,
    syncComServidor,
    enviarParaServidor,
    criarIndicador,
    onStatusChange,
    forcarSync,
    SERVER_URL,
    STORAGE_KEY,
    getStatus: () => status,
    ultimoSyncTexto: () => ultimoSyncTexto
  };

  // ============== AUTO INIT ==============

  injectAnimCSS();

  function init() {
    const estados = carregarLocal();
    syncComServidor(estados);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    setTimeout(init, 500);
  }

  // Re-sync a cada 30s
  setInterval(() => {
    const estados = carregarLocal();
    syncComServidor(estados);
  }, 30000);

  // Atualizar texto "há X tempo" a cada 15s
  setInterval(() => {
    if (ultimoSyncTimestamp) {
      ultimoSyncTexto = timeAgo(ultimoSyncTimestamp);
      const el = document.getElementById('sync-time');
      if (el) el.textContent = ultimoSyncTexto;
    }
  }, 15000);

})();
