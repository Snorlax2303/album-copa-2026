// sw.js — Service worker fantasma (não cacheia nada)
// Tudo passa direto pela rede. Zero cache.
// Só existe pra manter o PWA instalado funcionando.

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) => Promise.all(names.map((n) => caches.delete(n))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(fetch(event.request));
});
