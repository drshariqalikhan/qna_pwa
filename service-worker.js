// service-worker.js

const CACHE_NAME = 'gemma-chat-pwa-v2'; // Increment version to force update
const APP_SHELL_URLS = [
    '/',
    '/index.html',
    '/manifest.json',
    '/icons/icon-192.png',
    '/icons/icon-512.png'
];

self.addEventListener('install', event => {
    console.log('[ServiceWorker] Install event triggered.');
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('[ServiceWorker] Caching App Shell:', APP_SHELL_URLS);
            return cache.addAll(APP_SHELL_URLS);
        }).then(() => {
            console.log('[ServiceWorker] App Shell cached successfully.');
        })
    );
});

self.addEventListener('activate', event => {
    console.log('[ServiceWorker] Activate event triggered.');
    // This script can be used to clean up old caches
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('[ServiceWorker] Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', event => {
    // Log the request being fetched, but maybe filter out noisy requests like model chunks if needed
    // console.log(`[ServiceWorker] Fetching: ${event.request.url}`);

    event.respondWith(
        caches.match(event.request).then(cachedResponse => {
            if (cachedResponse) {
                // console.log(`[ServiceWorker] Found in cache: ${event.request.url}`);
                return cachedResponse;
            }
            
            // console.log(`[ServiceWorker] Not in cache, fetching from network: ${event.request.url}`);
            return fetch(event.request).then(networkResponse => {
                // Don't cache everything. For instance, you might want to avoid caching API calls if they were dynamic.
                // For this app, caching everything is fine.
                return caches.open(CACHE_NAME).then(cache => {
                    // console.log(`[ServiceWorker] Caching new resource: ${event.request.url}`);
                    cache.put(event.request, networkResponse.clone());
                    return networkResponse;
                });
            });
        })
    );
});