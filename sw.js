const CACHE_NAME = 'album-copa-v5-pwa';
const urlsToCache = [
  '/',
  '/index.html',
  '/gerente.html',
  '/nfc.html',
  '/styles.css?v=3',
  '/data.js?v=3',
  '/sync.js?v=2',
  '/app.js?v=3',
  '/manifest.json'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) => {
      return Promise.all(
        names.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) return response;
      return fetch(event.request).catch(() => {
        return caches.match('/index.html');
      });
    })
  );
});
