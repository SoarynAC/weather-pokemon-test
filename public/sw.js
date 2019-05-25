const CACHE_NAME = 'poke-cache-v2'
var urlsToCache = [
    '/favicon.ico',
    '/assets/css/style.css',
    '/assets/js/ajax.js',
    '/assets/js/map.js',
    '/assets/js/modal.js',
    '/assets/js/moment-timezone-10.min.js',
    '/assets/js/moment.min.js',
    '/assets/js/poketomap.js',
    '/assets/js/tz.js',
    '/assets/font/pokemon_pixel_font.ttf',
    '/assets/img/bg.png',
    '/assets/img/logo.png',
    '/assets/img/icon1.png',
    '/assets/img/icon2.png',
    '/assets/img/types/bug.png',
    '/assets/img/types/dark.png',
    '/assets/img/types/dragon.png',
    '/assets/img/types/electric.png',
    '/assets/img/types/fairy.png',
    '/assets/img/types/fighting.png',
    '/assets/img/types/ghost.png',
    '/assets/img/types/fire.png',
    '/assets/img/types/flying.png',
    '/assets/img/types/grass.png',
    '/assets/img/types/ground.png',
    '/assets/img/types/ice.png',
    '/assets/img/types/normal.png',
    '/assets/img/types/poison.png',
    '/assets/img/types/psychic.png',
    '/assets/img/types/rock.png',
    '/assets/img/types/steel.png',
    '/assets/img/types/water.png'
]

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function (cache) {
            return cache.addAll(urlsToCache)
        })
    )
})

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
        .then(function (response) {
            if (response) {
                return response
            }
            return fetch(event.request)
        })
    )
})