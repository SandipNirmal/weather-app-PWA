/**
 * Service worker for waether app
 * @author Sandip Nirmal
 * 27 Dec 2016
 */

// App version
const version = 'app-v0.0.2';

/**
 * Service Worker install event
 * Service worker lifecycle event triggered at when app loads (Service Worker)
 * loads
 */
this.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(version)
        .then(function(cache) {
            return cache.addAll([
                './index.html',
                './web_app/css/style.css',
                './w-icons/30.png',
                './w-icons/11.png',
                './w-icons/13.png',
                './w-icons/14.png',
                './w-icons/16.png',
                './w-icons/23.png',
                './assets/weather-app.png'
            ]);
        })
    );
});

/**
 * Fetch event
 *
 * Event triggered whenever a network request is made. You can decide wether you
 * want to serve content from cache or fetch network
 */
this.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
        .then(function(response) {
            return response || fetch(event.request);
        })
    );
});


/**
 * Service Worker activate event
 *
 * Activate event is triggered after installation, generally this should be used
 * for cleaning up of memory if we have previously installed app.
 *
 * Here we are deleting previous caches once new version is installed and
 * activated
 */
 this.addEventListener('activate', function(event) {
   event.waitUntil(
     caches.keys().then(function(keyList) {
       return Promise.all(keyList.map(function(key) {
         if (key !== version) {
           return caches.delete(key);
         }
       }));
     })
   );
 });
