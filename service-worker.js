// Minimal service-worker.js — safe caching strategy for the static wedding site
const CACHE_NAME = 'yaud-2026-v1';
const ASSETS = [
  './',
  './index%20(4).html',
  './style.css',
  './script.js',
  './manifest.json',
  './Couple1.jpg',
  './Couple2.jpg',
  './Couple3.jpg'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)).catch(err => console.warn('SW install cache failed', err))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  // Simple cache-first for known assets, fallback to network then cache
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(networkRes => {
        // put a copy in cache for future
        try {
          const copy = networkRes.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
        } catch (e) { /* ignore quota errors */ }
        return networkRes;
      }).catch(() => {
        // fallback to index page for navigation requests
        return caches.match('./index%20(4).html');
      });
    })
  );
});
