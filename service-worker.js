const CACHE_NAME = "yaud-2026-v3";

const STATIC_ASSETS = [
  "/",
  "/index.html",
  "/style.css",
  "/script.js",
  "/guests.json",
  "/Couple1.jpg",
  "/Couple2.jpg",
  "/Couple3.jpg"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  // navigation requests -> serve index.html (app shell) for SPA behavior
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(() => caches.match('/index.html'))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) {
        // background update
        event.waitUntil(
          fetch(event.request).then(resp => {
            if (!resp || resp.status !== 200) return;
            return caches.open(CACHE_NAME).then(cache => cache.put(event.request, resp.clone()));
          }).catch(()=>{})
        );
        return cached;
      }
      return fetch(event.request).then(resp => {
        if (!resp || resp.status !== 200) return resp;
        const clone = resp.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        return resp;
      }).catch(() => caches.match('/index.html'));
    })
  );
});
