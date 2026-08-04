// Improved service-worker.js — updated asset list and navigation fallback
const CACHE_NAME = 'yaud-2026-v1';
const ASSETS = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './manifest.json',
  './Couple1.jpg',
  './Couple2.jpg',
  './Couple3.jpg',
  './decorative-pattern.svg'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)).catch(err => console.warn('SW install cache failed', err))
  );
});

self.addEventListener('activate', (event) => {
  // cleanup old caches if any
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
    ))
  );
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  // navigation requests should serve the cached index.html (App Shell)
  if (event.request.mode === 'navigate'){
    event.respondWith(
      caches.match('./index.html').then(resp => resp || fetch(event.request).catch(()=>caches.match('./')))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(networkRes => {
        // cache a copy for future visits
        try {
          const copy = networkRes.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
        } catch (e) { /* ignore quota errors */ }
        return networkRes;
      }).catch(() => {
        // final fallback to cache root
        return caches.match('./');
      });
    })
  );
});
