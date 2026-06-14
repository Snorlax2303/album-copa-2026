/**
 * sync.js — Sincronizador do Álbum Copa 2026
 * 
 * Estratégia: localStorage como fonte primária (offline-first)
 * Servidor como backup/sync (online)
 * 
 * Fluxo:
 * 1. Carrega do localStorage (imediato)
 * 2. Tenta sync com servidor
 * 3. Se servidor responde, faz merge: o que está no servidor E não está no local = adiciona
 * 4. A cada save, tenta enviar pro servidor (fire-and-forget)
 */

(function() {
  'use strict';

  const STORAGE_KEY = 'album-copa-2026-v3';
  const SERVER_URL = 'https://sync.velhaturbo.cloud';
  const PASSKEY = 'da60a304b4c7';

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

  // ============== SYNC COM SERVIDOR ==============

  let ultimoSync = 0;
  const MIN_SYNC_INTERVAL = 5000; // 5s entre syncs

  async function syncComServidor(estadosLocais) {
    const agora = Date.now();
    if (agora - ultimoSync < MIN_SYNC_INTERVAL) return null;
    ultimoSync = agora;

    try {
      // Preparar payload: só tenho e repetida (falta é implícito)
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

      if (mudou) {
        salvarLocal(estadosLocais);
        // Disparar evento pra UI reagir
        window.dispatchEvent(new CustomEvent('album-sync', { detail: { estados: Object.fromEntries(estadosLocais) } }));
      }

      return data;
    } catch(e) {
      // Silêncio — offline é normal
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
    } catch(e) {
      // Falha ao enviar = normal (offline)
    }
  }

  // ============== EXPOR API GLOBAL ==============

  window.AlbumSync = {
    carregarLocal,
    salvarLocal,
    syncComServidor,
    enviarParaServidor,
    SERVER_URL,
    STORAGE_KEY
  };

  // ============== SYNC AUTOMÁTICO NO LOAD ==============

  // Disparar sync automático após carregar a página
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      const estados = carregarLocal();
      syncComServidor(estados);
    });
  } else {
    setTimeout(() => {
      const estados = carregarLocal();
      syncComServidor(estados);
    }, 500);
  }

  // Re-sync a cada 30s enquanto a página estiver aberta
  setInterval(() => {
    const estados = carregarLocal();
    syncComServidor(estados);
  }, 30000);

})();
