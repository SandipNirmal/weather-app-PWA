/**
* Service worker for waether app
* @author Sandip Nirmal
* 27 Dec 2016
*/

// App version
const version = 'app-v0.0.3';

/**
* Service Worker install event
* Service worker lifecycle event triggered at when app loads (Service Worker)
* loads. On service worker installation take application offline by saving
* website in cache.
*/
this.addEventListener('install', event => {
   event.waitUntil(
       caches.open(version)
       .then(cache => {
         return cache.addAll([
             'https://sandipnirmal.github.io/weather-app-PWA/index.html',
             'web_app/css/style.css',
             'web_app/js/app.js',
             'icons/11.png',
             'icons/16.png',
             'icons/20.png',
             'icons/24.png',
             'icons/26.png',
             'icons/30.png',
             'icons/32.png',
             'icons/4.png',
             'icons/turbine.png'
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
this.addEventListener('fetch', event => {
   event.respondWith(
       caches.match(event.request)
       .then(response => {
           return response || fetch(event.request);
       })
   );
});


/**
* Service Worker Push event
*
* Handles service worker push notification event
*/
this.addEventListener('push', event => {
   console.log('Received a push message', event);

   const title = 'Yay a message.';
   const body = 'We have received a push message.';
   const icon = '/images/icon-192x192.png';
   const tag = 'simple-push-demo-notification-tag';

   event.waitUntil(
       self.registration.showNotification(title, {
           body: body,
           icon: icon,
           tag: tag
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
this.addEventListener('activate', event => {
   event.waitUntil(
       caches.keys().then(keyList => {
           return Promise.all(keyList.map(key => {
               if (key !== version) {
                   return caches.delete(key);
               }
           }));
       })
   );
});
