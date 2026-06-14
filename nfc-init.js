/**
 * nfc-init.js — Lógica da landing NFC (extraída pra carregar com defer)
 * Smart routing: se PWA instalado → redireciona pro álbum
 * Se não → mostra tela de instalação ou conteúdo
 */
(function() {
  'use strict';

  const STORAGE_KEY = 'album-copa-2026-v3';
  const TOTAL = window.AlbumCopa ? window.AlbumCopa.data.total : 676;

  const isInstalled = window.matchMedia('(display-mode: standalone)').matches
    || window.matchMedia('(display-mode: minimal-ui)').matches
    || window.navigator.standalone === true;

  const jaViuNfc = localStorage.getItem('album-copa-nfc-visto') === 'true';
  let deferredPrompt = null;

  // ===== TELA DE INSTALAÇÃO =====

  function mostrarTelaInstalacao() {
    const container = document.getElementById('app');
    if (!container) return;

    container.innerHTML = `
      <div class="install-screen" style="
        display:flex; flex-direction:column; align-items:center; justify-content:center;
        min-height:80dvh; text-align:center; gap:2rem; padding:2rem;
        animation: fade-up 0.9s cubic-bezier(0.16,1,0.3,1) both;
      ">
        <div class="logo-icon" style="width:96px;height:96px;margin-bottom:0.5rem">
          <svg viewBox="0 0 100 100" fill="none">
            <rect x="2.5" y="2.5" width="95" height="95" rx="10" stroke="#d4af37" stroke-width="1.8" fill="none"/>
            <circle cx="50" cy="36" r="22" stroke="#d4af37" stroke-width="2" fill="none"/>
            <path d="M50 16L67 33L62 55L38 55L33 33Z" fill="#FFDF00" opacity="0.85"/>
            <circle cx="50" cy="36" r="4.5" fill="#0c0c0d"/>
            <text x="50" y="72" font-family="Inter, sans-serif" font-size="10" font-weight="800" fill="#d4af37" text-anchor="middle" letter-spacing="5">COPA</text>
            <text x="50" y="85" font-family="JetBrains Mono, monospace" font-size="6" font-weight="400" fill="rgba(240,237,232,0.25)" text-anchor="middle" letter-spacing="3">2026</text>
          </svg>
        </div>
        <h1 style="font-family:'Playfair Display',serif;font-weight:400;font-size:1.8rem;color:#f0ede8;line-height:1.2">
          álbum <i style="color:#d4af37;font-style:italic">copa 2026</i>
        </h1>
        <p style="color:rgba(240,237,232,0.45);font-size:0.85rem;max-width:300px;line-height:1.6">
          Instale o app para gerenciar sua coleção de figurinhas de qualquer lugar.<br/>Seus dados ficam salvos na nuvem.
        </p>
        <button id="btn-instalar-agora" style="
          padding:1rem 2.5rem; font-size:0.9rem; font-weight:600;
          background:transparent; border:1px solid #d4af37; color:#d4af37;
          cursor:pointer; transition:all 0.3s cubic-bezier(0.16,1,0.3,1);
          font-family:'Inter',sans-serif; letter-spacing:0.05em;
        ">📲 Instalar app</button>
        <button id="btn-pular-instalar" style="
          background:none; border:none; color:rgba(240,237,232,0.25);
          font-size:0.65rem; cursor:pointer; font-family:'JetBrains Mono',monospace;
          text-decoration:underline; transition:color 0.3s;
        ">depois eu instalo</button>
        <p id="nfc-fallback-msg" style="display:none;color:rgba(240,237,232,0.3);font-size:0.7rem;max-width:280px;line-height:1.5"></p>
      </div>
    `;

    document.getElementById('btn-instalar-agora').addEventListener('click', async () => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
          localStorage.setItem('album-copa-nfc-visto', 'true');
          location.reload();
        }
      } else {
        const msg = document.getElementById('nfc-fallback-msg');
        msg.textContent = 'No seu navegador, abra o menu → "Adicionar à tela inicial" ou "Instalar app"';
        msg.style.display = 'block';
      }
    });

    document.getElementById('btn-pular-instalar').addEventListener('click', () => {
      localStorage.setItem('album-copa-nfc-visto', 'true');
      mostrarConteudo();
    });
  }

  // ===== CONTEÚDO NORMAL =====

  function carregarStats() {
    const estados = new Map();
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const obj = JSON.parse(raw);
        Object.keys(obj).forEach(id => {
          if (['tenho', 'repetida'].includes(obj[id])) estados.set(id, obj[id]);
        });
      }
    } catch(e) {}

    const tenho = [...estados.values()].filter(v => v === 'tenho').length;
    const repetida = [...estados.values()].filter(v => v === 'repetida').length;
    const falta = Math.max(0, TOTAL - tenho - repetida);
    const pct = TOTAL ? Math.round((tenho / TOTAL) * 100) : 0;

    const elTenho = document.getElementById('st-tenho');
    if (elTenho) elTenho.textContent = tenho || '0';
    if (document.getElementById('st-repetida')) document.getElementById('st-repetida').textContent = repetida || '0';
    if (document.getElementById('st-falta')) document.getElementById('st-falta').textContent = falta || '0';
    if (document.getElementById('st-pct')) document.getElementById('st-pct').textContent = pct + '%';
    if (document.getElementById('st-tenho-count')) document.getElementById('st-tenho-count').textContent = tenho || '0';
    if (document.getElementById('st-total')) document.getElementById('st-total').textContent = TOTAL;
    if (document.getElementById('st-bar')) document.getElementById('st-bar').style.width = pct + '%';
  }

  function mostrarConteudo() {
    const container = document.querySelector('.container');
    if (container) container.style.display = 'flex';
    carregarStats();
    initAnimacoes();
  }

  // ===== ANIMAÇÕES =====

  function initAnimacoes() {
    if (typeof Motion === 'undefined') return;
    document.querySelectorAll('.anim-item').forEach((el, i) => {
      Motion.animate(el, { opacity: [0, 1], y: [14, 0] }, {
        duration: 0.7, delay: Motion.stagger(0.08, { from: i }), easing: [0.16, 1, 0.3, 1]
      });
    });
    document.querySelectorAll('.anim-card').forEach(card => {
      Motion.hover(card, {
        onEnter: () => Motion.animate(card, { y: -4, scale: 1.01 }, { duration: 0.25, easing: [0.16,1,0.3,1] }),
        onLeave: () => Motion.animate(card, { y: 0, scale: 1 }, { duration: 0.25, easing: [0.16,1,0.3,1] })
      });
      Motion.press(card, {
        onStart: () => Motion.animate(card, { scale: 0.98 }, { duration: 0.1 }),
        onEnd: () => Motion.animate(card, { scale: 1 }, { duration: 0.2, easing: Motion.spring({ stiffness: 300, damping: 15 }) })
      });
    });
  }

  // ===== EVENTS =====

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
  });

  window.addEventListener('appinstalled', () => {
    localStorage.setItem('album-copa-nfc-visto', 'true');
    deferredPrompt = null;
  });

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  }

  // ===== INIT =====

  function init() {
    if (isInstalled) {
      window.location.href = 'index.html';
      return;
    }
    if (!jaViuNfc) {
      const container = document.querySelector('.container');
      if (container) container.style.display = 'none';
      mostrarTelaInstalacao();
    } else {
      const btn = document.getElementById('btn-install');
      if (btn) btn.style.display = 'inline-block';
      mostrarConteudo();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
