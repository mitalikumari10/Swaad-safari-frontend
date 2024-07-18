const CACHE_NAME = 'offline-game-cache-v1';
const urlsToCache = [
  '/',
  '/game.html',
  '/style.css',
  '/script.js',
  '/offline-game/ground.png',
  '/offline-game/cactus.png',
  '/offline-game/dino-run-0.png',
  '/offline-game/dino-run-1.png',
  '/offline-game/dino-stationary.png',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
      .catch(error => {
        console.error('Failed to cache resources during installation:', error);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request).catch(error => {
          console.error('Failed to fetch:', event.request.url, error);
          throw error;
        });
      })
  );
});
