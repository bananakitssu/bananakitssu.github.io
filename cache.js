const CACHE_NAME = 'btdpe-cached-version-v2';
const OFFLINE_URL = '/OFFLINE.html';
const UNKNOWN_PAGE_URL = '/UNKNOWN.html';
const URLS_TO_CACHE = [
    OFFLINE_URL,
    UNKNOWN_PAGE_URL
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('[ServiceWorker | catche.js]: Caching BTDPE pages...');
                return cache.addAll(URLS_TO_CACHE);
            })
            .catch(error => {
                console.log('[ServiceWorker | cache.js]: Failed to cache pages. Error: ', error);
                return;
            })
    );
    console.log('[ServiceWorker | cache.js]: Successfully cached pages');
});

self.addEventListener('fetch', event => {
    if (event.request.mode === 'navigate') {
        event.respondWith(
            fetch(event.request)
                .then(response => {
                    if (response.ok) {
                        return response;
                    }

                    if (response.status === 404) {
                        return caches.match(UNKNOWN_PAGE_URL);
                    }

                    return response;
                })
                .catch(() => {
                    return caches.match(OFFLINE_URL);
                })
        );
    } else {
        event.respondWith(
            caches.match(event.request)
                .then(response => {
                    return response || fetch(event.request);
                })
        );
    };
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});