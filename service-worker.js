// service-worker.js

const CACHE_NAME = 'gemma-chat-pwa-v1';

// List of files that make up the "app shell"
// Since JS and CSS are in index.html, the list is shorter.
const APP_SHELL_URLS = [
    '/',
    '/index.html',
    '/manifest.json',
    '/icons/icon-192.png',
    '/icons/icon-512.png'
];

// The install event fires when the service worker is first installed.
self.addEventListener('install', event => {
    console.log('Service Worker: Installing...');
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('Service Worker: Caching App Shell');
            return cache.addAll(APP_SHELL_URLS);
        })
    );
});

// The fetch event fires for every network request.
self.addEventListener('fetch', event => {
    // We use a "Cache, falling back to Network" strategy.
    // This is ideal for our PWA. It makes the app load instantly
    // and caches new resources (like the AI model files) as they are downloaded.
    event.respondWith(
        caches.match(event.request).then(cachedResponse => {
            // If the response is in the cache, return it
            if (cachedResponse) {
                return cachedResponse;
            }
            
            // If it's not in the cache, fetch it from the network
            return fetch(event.request).then(networkResponse => {
                // And cache the new response for future offline use
                return caches.open(CACHE_NAME).then(cache => {
                    // We need to clone the response because it's a stream
                    // that can only be consumed once.
                    cache.put(event.request, networkResponse.clone());
                    return networkResponse;
                });
            });
        })
    );
});