/**
 * app.js
 *
 * 04/01/2017
 * @author Sandip Nirmal
 */

(function() {
    'use strict';

    const AppConfig = {
        daysOfWeek: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        refreshBtn: document.getElementById('btnRefresh'),
        lastKnownLocation: {},
        currentLocation: {}
    };

    /**
     * Add event handlers
     */
    // window.on('scroll', handleScroll);

    AppConfig.refreshBtn.addEventListener('click', getLatestWeather);


    /**
     * Handles window scroll event, apply position fixed to current weather
     * container once it is scrolled past header
     */
    function handleScroll() {}


    /**
     * Fetch latest weather info for current locatio
     */
    function getLatestWeather() {}

    /**
     * Tries to fetch current user location, if found returns current location
     * else returns last saved location
     */
    function getCurrentLocation() {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(function(data) {
                console.log(data)
                updateLocationInfo(data);
            }, function(err) {
                console.log('Error occurred', err)
            });
        }
    }

    /**
     * Retrievs required info from location object and Updates lastKnownLocation
     * and currentLocation object
     */
    function updateLocationInfo(data) {
        const lat = data && data.coords.latitude;
        const lon = data && data.coords.longitude;

        currentLocation = {
            lat: lat,
            lon: lon
        };

        // update lastKnownLocation only if currentLocation values are defined
        lat && (lastKnownLocation.lat = lat);
        lon && (lastKnownLocation.lon = lon);
    }
})();
