// AgriScan Ghana (AGSG) - Offline PWA Service Worker for PWABuilder & Android APK
const CACHE_NAME = 'agriscan-ghana-v4';
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/pwa-192x192.png',
  '/pwa-512x512.png',
  '/pwa-maskable-512x512.png',
  '/apple-touch-icon.png',
  '/icon.svg',
  '/icon-maskable.svg',
  '/crops/maize.jpg',
  '/crops/cassava.jpg',
  '/crops/plantain.jpg',
  '/crops/yam.jpg',
  '/crops/cocoa.jpg',
  '/crops/oil_palm.jpg',
  '/crops/tomato.jpg',
  '/crops/pepper.jpg',
  '/crops/cowpea.jpg'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Cache each asset individually so one slow or missing network item does not fail the whole cache
      return Promise.allSettled(
        PRECACHE_ASSETS.map((asset) =>
          cache.add(asset).catch((err) => {
            console.warn(`[AGSG SW] Precache fallback for ${asset}:`, err);
          })
        )
      );
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Cache-first strategy for offline resilience
  event.respondWith(
    caches.match(event.request, { ignoreSearch: true }).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          // If offline and navigating to a page, serve cached index.html
          if (event.request.mode === 'navigate') {
            return caches.match('/index.html').then((indexFallback) => {
              return indexFallback || caches.match('/');
            });
          }
          // Fallback match by pathname
          return caches.match(url.pathname, { ignoreSearch: true });
        });
    })
  );
});
