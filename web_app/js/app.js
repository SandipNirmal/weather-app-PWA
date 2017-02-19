/**
 * app.js
 *
 * 04/01/2017
 * @author Sandip Nirmal
 */

(function() {
    'use strict';

    // App configs
    var app = {
        daysOfWeek: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        refreshBtn: document.getElementById('btnRefresh'),
        lastKnownLocation: {},
        currentLocation: {},
        woeid: 2295412, // woeid for Pune
        yahooWeatherApi: `https://query.yahooapis.com/v1/public/yql?format=json&q=`,
        yqlStatement: `select * from weather.forecast where woeid=`
    };

    // initial weather data to initialise
    const initialWeatherData = {
        "units": {
            "distance": "mi",
            "pressure": "in",
            "speed": "mph",
            "temperature": "F"
        },
        "title": "Yahoo! Weather - Pune, MH, IN",
        "link": "http://us.rd.yahoo.com/dailynews/rss/weather/Country__Country/*https://weather.yahoo.com/country/state/city-2295412/",
        "description": "Yahoo! Weather for Pune, MH, IN",
        "language": "en-us",
        "lastBuildDate": "Wed, 21 Dec 2016 12:01 PM IST",
        "ttl": "60",
        "location": {
            "city": "Pune",
            "country": "India",
            "region": " MH"
        },
        "wind": {
            "chill": "73",
            "direction": "68",
            "speed": "4"
        },
        "atmosphere": {
            "humidity": "42",
            "pressure": "945.0",
            "rising": "0",
            "visibility": "16.1"
        },
        "astronomy": {
            "sunrise": "7:3 am",
            "sunset": "6:4 pm"
        },
        "image": {
            "title": "Yahoo! Weather",
            "width": "142",
            "height": "18",
            "link": "http://weather.yahoo.com",
            "url": "http://l.yimg.com/a/i/brand/purplelogo//uh/us/news-wea.gif"
        },
        "item": {
            "title": "Conditions for Pune, MH, IN at 10:30 AM IST",
            "lat": "18.53611",
            "long": "73.85218",
            "link": "http://us.rd.yahoo.com/dailynews/rss/weather/Country__Country/*https://weather.yahoo.com/country/state/city-2295412/",
            "pubDate": "Wed, 21 Dec 2016 10:30 AM IST",
            "condition": {
                "code": "30",
                "date": "Wed, 21 Dec 2016 10:30 AM IST",
                "temp": "91",
                "text": "Clear"
            },
            "forecast": [{
                "code": "30",
                "date": "21 Dec 2016",
                "day": "Wed",
                "high": "85",
                "low": "57",
                "text": "Partly Cloudy"
            }, {
                "code": "30",
                "date": "22 Dec 2016",
                "day": "Thu",
                "high": "86",
                "low": "62",
                "text": "Partly Cloudy"
            }, {
                "code": "30",
                "date": "23 Dec 2016",
                "day": "Fri",
                "high": "87",
                "low": "59",
                "text": "Partly Cloudy"
            }, {
                "code": "32",
                "date": "24 Dec 2016",
                "day": "Sat",
                "high": "88",
                "low": "61",
                "text": "Sunny"
            }, {
                "code": "32",
                "date": "25 Dec 2016",
                "day": "Sun",
                "high": "88",
                "low": "63",
                "text": "Sunny"
            }, {
                "code": "32",
                "date": "26 Dec 2016",
                "day": "Mon",
                "high": "87",
                "low": "63",
                "text": "Sunny"
            }, {
                "code": "32",
                "date": "27 Dec 2016",
                "day": "Tue",
                "high": "80",
                "low": "62",
                "text": "Sunny"
            }, {
                "code": "32",
                "date": "28 Dec 2016",
                "day": "Wed",
                "high": "81",
                "low": "60",
                "text": "Sunny"
            }, {
                "code": "32",
                "date": "29 Dec 2016",
                "day": "Thu",
                "high": "82",
                "low": "61",
                "text": "Sunny"
            }, {
                "code": "32",
                "date": "30 Dec 2016",
                "day": "Fri",
                "high": "81",
                "low": "59",
                "text": "Sunny"
            }],
            "description": "<![CDATA[<img src=\"http://l.yimg.com/a/i/us/we/52/30.gif\"/>\n<BR />\n<b>Current Conditions:</b>\n<BR />Partly Cloudy\n<BR />\n<BR />\n<b>Forecast:</b>\n<BR /> Wed - Partly Cloudy. High: 85Low: 57\n<BR /> Thu - Partly Cloudy. High: 86Low: 62\n<BR /> Fri - Partly Cloudy. High: 87Low: 59\n<BR /> Sat - Sunny. High: 88Low: 61\n<BR /> Sun - Sunny. High: 88Low: 63\n<BR />\n<BR />\n<a href=\"http://us.rd.yahoo.com/dailynews/rss/weather/Country__Country/*https://weather.yahoo.com/country/state/city-2295412/\">Full Forecast at Yahoo! Weather</a>\n<BR />\n<BR />\n(provided by <a href=\"http://www.weather.com\" >The Weather Channel</a>)\n<BR />\n]]>",
            "guid": {
                "isPermaLink": "false"
            }
        }
    };

    /**
     * Add event handlers
     */
    window.onscroll = handleScroll;

    app.refreshBtn.addEventListener('click', getLatestWeather);

    // Make weather data request for latest Data
    getLatestWeather();

    /**
     * Handles window scroll event, apply position fixed to current weather
     * container once it is scrolled past header
     */
    function handleScroll() {}

    /**
     * Fetch latest weather info for current locatio
     */
    function getLatestWeather() {
        // const url = `${app.yahooWeatherApi}${app.yqlStatement}${app.woeid}`;
        //
        // // Fetch the latest data.
        // const request = new XMLHttpRequest();
        //
        // request.onreadystatechange = function() {
        //     if (request.readyState === XMLHttpRequest.DONE) {
        //         if (request.status === 200) {
        //             const response = JSON.parse(request.response);
        //             const results = response.query.results.channel;
        //             // results.key = key;
        //             // results.label = label;
        //             results.created = response.query.created;
        //             updateWeatherData(results);
        //         }
        //     } else {
        //         // Return the initial weather forecast since no data is available.
        //         updateWeatherData(initialWeatherData);
        //     }
        // };
        // request.open('GET', url);
        // request.send();

        updateWeatherData(initialWeatherData);

    }

    /**
     * Update latest weather data
     */
    function updateWeatherData(weatherData) {
        console.log('Weather Data', weatherData);

        let {
            location,
            item: {
                forecast,
                condition: current
            },
            astronomy,
            atmosphere,
            wind,
            lastBuildDate: buildDate
        } = weatherData;

        // today's forecast
        let forecastToday = forecast[0];

        // update header and basic info
        document.querySelector('.city-info .place').innerText = `${location.city},${location.region}`;
        document.querySelector('.city-info .time').innerText = `${buildDate}
        (Last Updated)`;

        document.querySelector('#currentWeather .w-cond .cond-code').src = `./../w-icons/${current.code}.png`;
        document.querySelector('#currentWeather .w-cond .cond').innerText = `${current.text}`;
        document.querySelector('#currentWeather .cur-temp span').innerText = `${farenheitToCelsius(current.temp)}`;

        document.querySelector('#temp-max').innerHTML =``;

        // update forecast
        // update other info
    }

    /**
     * Tries to fetch current user location, if found returns current location
     * else returns last saved location
     */
    app.getCurrentLocation = function() {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(data => {
                console.log(data)
                updateLocationInfo(data);
            }, err => {
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

    /**
     * Converts trmperature from farenheit to celsius
     * @param {Number} temp - temparaute value in farenheit
     * @return {Number} temparaute in celsius
     */
    function farenheitToCelsius(temp) {
        return Math.round((temp - 32) * (5 / 9), 0);
    }

    /**
     * Converts trmperature from celsius to farenheit
     * @param {Number} temp - temparaute value in celsius
     * @return {Number} temparaute in farenheit
     */
    function celsiusToFarenheit(temp) {
        return Math.round((temp + 32) * (9 / 5), 0);
    }
})();
