// sw.js
const CACHE_NAME = 'pwa-logger-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  // '/styles.css', // Not needed if CSS is inline
  // '/script.js',  // Not needed if JS is inline
  '/icon-192x192.png',
  '/icon-512x512.png',
  '/apple-touch-icon.png'
  // Add other static assets if you have them
];

// Install event: cache core assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting()) // Force activation of new SW
  );
});

// Activate event: clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(cacheName => {
          return cacheName.startsWith('pwa-logger-cache-') && cacheName !== CACHE_NAME;
        }).map(cacheName => {
          return caches.delete(cacheName);
        })
      );
    }).then(() => self.clients.claim()) // Take control of open clients
  );
});

// Fetch event: serve from cache, fallback to network
self.addEventListener('fetch', event => {
  // We only want to cache GET requests for app shell files
  if (event.request.method === 'GET' && urlsToCache.includes(new URL(event.request.url).pathname)) {
    event.respondWith(
      caches.match(event.request)
        .then(response => {
          if (response) {
            return response; // Serve from cache
          }
          return fetch(event.request).then(
            networkResponse => {
              // Optionally cache new assets dynamically if needed,
              // but for bare-bones, pre-caching is often enough.
              return networkResponse;
            }
          );
        })
    );
  } else if (event.request.method === 'POST' && event.request.url.includes('script.google.com')) {
    // For POST requests to Google Apps Script, just fetch them directly.
    // Do not attempt to cache these.
    event.respondWith(fetch(event.request));
  } else {
    // For other requests, just fetch from network.
    // This ensures non-cached resources (like external APIs not Google Scripts) work.
    event.respondWith(fetch(event.request));
  }
});