/**
 * nfc-init.js v3 — Landing NFC com smart routing PWA
 *
 * FLUXO:
 * 1. Tenta abrir no PWA já instalado via custom scheme + intent
 * 2. Se já estiver no PWA (display-mode standalone) → vai pro index.html
 * 3. Se não → mostra tela de instalação
 * 4. Se já viu antes → mostra stats direto
 */
(function() {
  'use strict';

  const STORAGE_KEY = 'album-copa-2026-v3';
  const TOTAL = 676;

  const isStandalone = window.matchMedia('(display-mode: standalone)').matches
    || window.matchMedia('(display-mode: minimal-ui)').matches
    || window.navigator.standalone === true;

  const jaViuNfc = localStorage.getItem('album-copa-nfc-visto') === 'true';
  let deferredPrompt = null;

  // ===== SMART ROUTING: TENTAR ABRIR NO PWA =====

  function tentarAbrirNoPwa() {
    // Se já tá no PWA, redireciona pro álbum
    if (isStandalone) {
      window.location.replace('index.html');
      return true;
    }

    // Tenta abrir via start_url do manifest
    // O Android PWA registra o start_url como intent-filter
    // Usamos um iframe invisível + setTimeout pra detectar se falhou
    try {
      const iframe = document.createElement('iframe');
      iframe.style.cssText = 'position:fixed;left:-9999px;top:-9999px;width:1px;height:1px;opacity:0';
      iframe.src = '/index.html';
      document.body.appendChild(iframe);

      // Se funcionou (PWA abre), remove o iframe e deixa o fluxo seguir
      setTimeout(() => {
        if (document.body.contains(iframe)) document.body.removeChild(iframe);
      }, 500);

      return false; // Continua no fluxo normal
    } catch(e) {
      return false;
    }
  }

  // ===== ANIMAÇÕES =====

  function animarElementos() {
    document.querySelectorAll('.anim-item').forEach((el, i) => {
      setTimeout(() => {
        el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 80 * i);
    });
  }

  // ===== TELA DE INSTALAÇÃO =====

  function mostrarTelaInstalacao() {
    const container = document.querySelector('.container');
    if (!container) return;

    container.style.display = 'none';

    const installScreen = document.createElement('div');
    installScreen.className = 'install-screen';
    installScreen.style.cssText = `
      display:flex; flex-direction:column; align-items:center; justify-content:center;
      min-height:80dvh; text-align:center; gap:2rem; padding:2rem; width:100%; max-width:400px;
    `;

    installScreen.innerHTML = `
      <div class="logo-icon" style="width:96px;height:96px">
        <svg viewBox="0 0 100 100" fill="none" width="96" height="96">
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
        Instale o app para gerenciar sua coleção de figurinhas de qualquer lugar.
      </p>
      <button id="btn-instalar-agora" style="
        padding:1rem 2.5rem; font-size:0.9rem; font-weight:600;
        background:transparent; border:1px solid #d4af37; color:#d4af37;
        cursor:pointer; transition:all 0.3s ease;
        font-family:'Inter',sans-serif; letter-spacing:0.05em; border-radius:8px;
      " onclick="this.style.background='rgba(212,175,55,0.1)'">📲 Instalar app</button>
      <button id="btn-pular-instalar" style="
        background:none; border:none; color:rgba(240,237,232,0.25);
        font-size:0.65rem; cursor:pointer; font-family:'JetBrains Mono',monospace;
        text-decoration:underline; transition:color 0.3s;
      ">depois eu instalo</button>
      <p id="nfc-fallback-msg" style="display:none;color:rgba(240,237,232,0.3);font-size:0.7rem;max-width:280px;line-height:1.5"></p>
    `;

    document.body.appendChild(installScreen);

    document.getElementById('btn-instalar-agora').addEventListener('click', async () => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
          localStorage.setItem('album-copa-nfc-visto', 'true');
          window.location.href = 'index.html';
        }
      } else {
        const msg = document.getElementById('nfc-fallback-msg');
        msg.textContent = 'No menu do navegador (⋮), toque em "Adicionar à tela inicial" ou "Instalar app"';
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

    const setText = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    setText('st-tenho', tenho || '0');
    setText('st-repetida', repetida || '0');
    setText('st-falta', falta || '0');
    setText('st-pct', pct + '%');
    setText('st-tenho-count', tenho || '0');
    setText('st-total', TOTAL);
    const bar = document.getElementById('st-bar');
    if (bar) bar.style.width = pct + '%';
  }

  function mostrarConteudo() {
    const container = document.querySelector('.container');
    if (container) {
      container.style.display = 'flex';
      const installScreen = document.querySelector('.install-screen');
      if (installScreen) installScreen.remove();
    }
    carregarStats();
    animarElementos();
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
    // Se já tá no PWA, vai pro álbum na hora
    if (isStandalone) {
      window.location.replace('index.html');
      return;
    }

    // Tenta abrir no PWA (se instalado, o iframe vai resolver)
    const abriuPwa = tentarAbrirNoPwa();
    if (abriuPwa) return;

    if (!jaViuNfc) {
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
