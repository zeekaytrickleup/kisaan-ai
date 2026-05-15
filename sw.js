// Kisaan AI — Service Worker v4 (cache busted)
const CACHE = 'kisaan-ai-v4';

// On install: delete ALL old caches, force fresh load
self.addEventListener('install', e => {
  self.skipWaiting(); // activate immediately
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => caches.delete(key)))
    )
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(clients.claim()); // take control immediately
});

// Network-first strategy: always try network, only use cache as fallback
self.addEventListener('fetch', e => {
  // Do not cache POST requests (like API calls)
  if (e.request.method !== 'GET') {
    e.respondWith(fetch(e.request));
    return;
  }
  
  // Never cache JS files — always fetch fresh
  if (e.request.url.includes('/js/')) {
    e.respondWith(fetch(e.request));
    return;
  }
  // For everything else: network first, cache fallback
  e.respondWith(
    fetch(e.request)
      .then(response => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return response;
      })
      .catch(() => caches.match(e.request))
  );
});
