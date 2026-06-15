/**
 * sync.js v3 — Sincronizador do Álbum Copa 2026
 *
 * REGRA ÚNICA: Servidor é a fonte da verdade.
 * - Ao marcar/desmarcar: envia pro servidor, servidor confirma
 * - Polling a cada 15s: puxa do servidor e sobrescreve TUDO no localStorage
 * - Sem merge, sem "se não existe adiciona" — só sobrescreve
 */
(function() {
  'use strict';

  const STORAGE_KEY = 'album-copa-2026-v3';
  const SERVER_URL = 'https://sync.velhaturbo.cloud';
  const PASSKEY = 'da60a304b4c7';

  let status = 'offline';
  let ultimoSync = 0;
  let callbacks = [];
  let timeEl = null;

  function setStatus(s, ts) {
    status = s;
    atualizarIndicador();
    callbacks.forEach(cb => cb(status));
  }

  function onStatusChange(cb) { callbacks.push(cb); }

  // ===== LOCAL =====
  function carregarLocal() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch(e) { return {}; }
  }

  function salvarLocal(obj) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(obj)); } catch(e) {}
  }

  function timeAgo(ts) {
    if (!ts) return '—';
    const d = Math.floor((Date.now() - ts) / 1000);
    if (d < 5) return 'agora';
    if (d < 60) return `há ${d}s`;
    return `há ${Math.floor(d/60)}min`;
  }

  // ===== SYNC =====
  async function puxarDoServidor() {
    const agora = Date.now();
    if (agora - ultimoSync < 3000) return;
    ultimoSync = agora;

    setStatus('syncing');
    try {
      const resp = await fetch(SERVER_URL + '/estados', { signal: AbortSignal.timeout(8000) });
      if (!resp.ok) throw new Error('HTTP ' + resp.status);
      const data = await resp.json();
      if (!data.ok) throw new Error('API error');

      // SERVER É A VERDADE: sobrescreve localStorage COMPLETAMENTE
      const serverEstados = data.estados || {};

      // Pega o que o servidor tem + o que o usuário marcou localmente mas o servidor ainda não sabe
      const local = carregarLocal();

      // Se o servidor tem algo diferente, sobrescreve
      let mudou = false;
      const merged = {};

      // Primeiro: tudo que o servidor tem
      Object.keys(serverEstados).forEach(id => {
        merged[id] = serverEstados[id];
      });

      // Só mantém do local o que o servidor NÃO tem (pode ser que o servidor ainda não recebeu)
      Object.keys(local).forEach(id => {
        if (!merged[id]) {
          merged[id] = local[id];
        }
      });

      // Compara com o local pra ver se mudou
      Object.keys(merged).forEach(id => {
        if (local[id] !== merged[id]) mudou = true;
      });
      Object.keys(local).forEach(id => {
        if (!merged[id]) mudou = true;
      });

      if (mudou) {
        salvarLocal(merged);
        window.dispatchEvent(new CustomEvent('album-sync', { detail: { estados: merged } }));
      }

      setStatus('online', agora);
      return data;
    } catch(e) {
      setStatus('offline');
      return null;
    }
  }

  async function enviarTudo() {
    setStatus('syncing');
    try {
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

      // Servidor confirmou — sobrescreve local
      if (data.estados) {
        salvarLocal(data.estados);
        window.dispatchEvent(new CustomEvent('album-sync', { detail: { estados: data.estados } }));
      }
      setStatus('online', Date.now());
      return true;
    } catch(e) {
      setStatus('offline');
      return false;
    }
  }

  // ===== MARCAR (chamado pelo app.js / gerente) =====
  function marcar(figId, estado) {
    const local = carregarLocal();
    if (estado && ['tenho', 'repetida'].includes(estado)) {
      local[figId] = estado;
    } else {
      delete local[figId];
    }
    salvarLocal(local);

    // Envia pro servidor (fire-and-forget com retry no polling)
    fetch(SERVER_URL + '/sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ passkey: PASSKEY, estados: { [figId]: estado || null } }),
      signal: AbortSignal.timeout(5000)
    }).catch(() => {});
  }

  // ===== INDICADOR =====
  function criarIndicador(container) {
    if (!container || document.getElementById('sync-indicator')) return;
    const w = document.createElement('div');
    w.id = 'sync-indicator';
    w.style.cssText = 'display:inline-flex;align-items:center;gap:0.4rem;font-family:JetBrains Mono,monospace;font-size:0.55rem;letter-spacing:0.05em;color:rgba(240,237,232,0.35);margin-left:auto';

    const dot = document.createElement('span');
    dot.id = 'sync-dot';
    dot.style.cssText = 'width:6px;height:6px;border-radius:50%;display:inline-block;flex-shrink:0;background:#ef5350;transition:background 0.3s';
    w.appendChild(dot);

    const label = document.createElement('span');
    label.id = 'sync-label';
    label.textContent = 'offline';
    label.style.cssText = 'font-size:0.55rem;text-transform:uppercase;letter-spacing:0.08em';
    w.appendChild(label);

    w.appendChild(document.createTextNode(' · '));

    timeEl = document.createElement('span');
    timeEl.id = 'sync-time';
    timeEl.textContent = '—';
    w.appendChild(timeEl);

    const btn = document.createElement('button');
    btn.textContent = '↻';
    btn.style.cssText = 'background:none;border:1px solid rgba(255,255,255,0.08);color:rgba(240,237,232,0.3);cursor:pointer;padding:0.15rem 0.4rem;font-size:0.7rem;line-height:1;font-family:inherit';
    btn.onclick = () => { btn.style.transform = 'rotate(360deg)'; btn.style.transition = 'transform 0.5s'; enviarTudo().then(() => setTimeout(() => { btn.style.transform = 'rotate(0deg)'; }, 600)); };
    w.appendChild(btn);

    container.appendChild(w);
  }

  function atualizarIndicador() {
    const dot = document.getElementById('sync-dot');
    const label = document.getElementById('sync-label');
    if (!dot || !label) return;
    if (status === 'online') { dot.style.background = '#4caf50'; dot.style.boxShadow = '0 0 6px rgba(76,175,80,0.4)'; label.textContent = 'online'; label.style.color = 'rgba(76,175,80,0.7)'; }
    else if (status === 'syncing') { dot.style.background = '#ff9800'; dot.style.boxShadow = '0 0 6px rgba(255,152,0,0.4)'; dot.style.animation = 'sync-pulse 0.8s infinite'; label.textContent = 'sync'; label.style.color = 'rgba(255,152,0,0.7)'; }
    else { dot.style.background = '#ef5350'; dot.style.boxShadow = 'none'; label.textContent = 'offline'; label.style.color = 'rgba(239,83,80,0.5)'; }
    if (timeEl) timeEl.textContent = timeAgo(ultimoSync);
  }

  // ===== CSS =====
  (function injectCSS() {
    if (document.getElementById('sync-anim-css')) return;
    const s = document.createElement('style');
    s.id = 'sync-anim-css';
    s.textContent = '@keyframes sync-pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.5;transform:scale(1.3)}}';
    document.head.appendChild(s);
  })();

  // ===== API PÚBLICA =====
  window.AlbumSync = {
    carregarLocal, salvarLocal,
    puxarDoServidor, enviarTudo, marcar,
    criarIndicador, onStatusChange,
    getStatus: () => status,
    STORAGE_KEY, SERVER_URL
  };

  // ===== INIT =====
  if (document.readyState === 'loading')
    document.addEventListener('DOMContentLoaded', () => { puxarDoServidor(); });
  else
    setTimeout(puxarDoServidor, 200);

  setInterval(puxarDoServidor, 15000); // Polling 15s
  setInterval(() => { if (timeEl) timeEl.textContent = timeAgo(ultimoSync); }, 10000);
})();
