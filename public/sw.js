const CACHE_NAME = 'poke-cache-v4'
var urlsToCache = [
    '/assets/css/style.css',
    '/assets/js/ajax.js',
    '/assets/js/map.js',
    '/assets/js/modal.js',
    '/assets/js/moment-timezone-10.min.js',
    '/assets/js/moment.min.js',
    '/assets/js/poketomap.js',
    '/assets/js/tz.js',
    '/assets/font/pokemon_pixel_font.ttf'
]

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function (cache) {
            return cache.addAll(urlsToCache)
        })
    )
})

self.addEventListener('activate', event => {  
    const cacheWhitelist = [CACHE_NAME];
  
    event.waitUntil(
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
        .then(function (response) {
            if (response) {
                return response
            }
            return fetch(event.request)
                .then(response => {
                    return caches.open(CACHE_NAME)
                        .then(cache => {
                            if (!event.request.url.includes('/buscar?lon')) {
                                cache.put(event.request.url, response.clone())
                            }
                            
                            return response
                        })
                })
        })
    )
})