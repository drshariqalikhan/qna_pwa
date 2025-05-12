// sw-workbox.js

importScripts('https://storage.googleapis.com/workbox-cdn/releases/7.1.0/workbox-sw.js');

if (workbox) {
    console.log(`Workbox is loaded 🎉`);

    workbox.core.setCacheNameDetails({
        prefix: 'my-qna-pwa', // Updated prefix for clarity
        suffix: 'v1', // Version for this app
        precache: 'precache',
        runtime: 'runtime-cache'
    });

    // Precache the app shell and essential assets
    // Revision is null so it updates on each build if files change content
    workbox.precaching.precacheAndRoute([
        { url: './', revision: null }, // Caches the root (often index.html)
        { url: './index.html', revision: null },
        { url: './manifest.json', revision: null },
        { url: './icons/icon-192x192.png', revision: null },
        { url: './icons/icon-512x512.png', revision: null }
        // Note: TensorFlow.js scripts are loaded from CDN and not precached by default.
        // For offline TFJS, you'd need a runtime caching strategy for the CDN URLs.
    ]);

    // Optional: Runtime caching for Google Fonts or other external assets if you use them
    // workbox.routing.registerRoute(
    //     ({url}) => url.origin === 'https://fonts.googleapis.com',
    //     new workbox.strategies.StaleWhileRevalidate({
    //         cacheName: 'google-fonts-stylesheets',
    //     })
    // );

    // Optional: Runtime caching for TensorFlow.js CDN (use with caution due to size/updates)
    /*
    workbox.routing.registerRoute(
        ({url}) => url.origin === 'https://cdn.jsdelivr.net' &&
                   url.pathname.startsWith('/npm/@tensorflow'),
        new workbox.strategies.CacheFirst({ // Or StaleWhileRevalidate
            cacheName: 'tfjs-cdn-cache',
            plugins: [
                new workbox.cacheableResponse.CacheableResponsePlugin({
                    statuses: [0, 200], // Cache opaque responses and successful ones
                }),
                new workbox.expiration.ExpirationPlugin({
                    maxEntries: 10, // Cache a few model/library versions
                    maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
                }),
            ],
        })
    );
    */


    workbox.core.skipWaiting();
    workbox.core.clientsClaim();

    self.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'SKIP_WAITING') {
          self.skipWaiting();
        }
    });

    console.log('Workbox service worker configured for Q&A PWA.');

} else {
    console.error(`Workbox didn't load 😬`);
}
