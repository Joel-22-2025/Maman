const cacheName = 'remise-cache-v1';
const filesToCache = [
  './',
  './index.html',
  './index2.html',
  './manifest.json',
  './icons/icon.png',
  './icons/icon-192.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});