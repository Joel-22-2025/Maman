// const cacheName = 'remise-cache-v1';
// const filesToCache = [
//   './',
//   './index.html',
//   './index2.html',
//   './style1.css',
//   './style2.css',
//   './js1.js',
//   './js2.js',
//   './manifest.json',
//   './icons/icon-512png',
//   './icons/icon-192.png',
// ];

// self.addEventListener('install', (event) => {
//   event.waitUntil(
//     caches.open(cacheName).then((cache) => {
//       return cache.addAll(filesToCache);
//     })
//   );
// });

// self.addEventListener('fetch', (event) => {
//   event.respondWith(
//     caches.match(event.request).then((cachedResponse) => {
//       return cachedResponse || fetch(event.request);
//     })
//   );
// });


const cacheName = 'remise-cache-v1';
const filesToCache = [
  './',
  './index.html',
  './index2.html',
  './style1.css',
  './style2.css',
  './js1.js',
  './js2.js',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

// INSTALLATION : mise en cache initiale
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(filesToCache);
    })
  );
  self.skipWaiting();
});

// ACTIVATION : nettoyage des anciens caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== cacheName) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// FETCH : servir depuis le cache si possible
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request).catch(() => {
        // Fallback si hors ligne et ressource non trouvée
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});
