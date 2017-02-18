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
        currentLocation: {},
        woeid: 2295412, // woeid for Pune
        yahooWeatherApi: `https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%3D2295412&format=json&diagnostics=true&callback=`
    };

    /**
     * Add event handlers
     */
    // window.onscroll = handleScroll;
    AppConfig.refreshBtn.addEventListener('click', getLatestWeather);

    /**
     * Handles window scroll event, apply position fixed to current weather
     * container once it is scrolled past header
     */
    function handleScroll() {}


    /**
     * Fetch latest weather info for current locatio
     */
    function getLatestWeather() {
    	alert('Get Weather Updates!!');
      //https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%3D2295412&format=json&diagnostics=true&callback=
    }

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
