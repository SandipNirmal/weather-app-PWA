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

    document.querySelector('#currentWeather .w-cond .cond-code').src = `./../icons/${getConditionIcon(current.code)}.png`;
    document.querySelector('#currentWeather .w-cond .cond').innerText = `${current.text}`;
    document.querySelector('#currentWeather .cur-temp span').innerHTML = `${farenheitToCelsius(current.temp)}&#xb0;`;

    document.querySelector('#temp-max').innerHTML = `<svg width="20" height="20" viewBox="0 0 48 48" data-icon="arrow-up" style="fill: rgb(255, 255, 255); stroke: rgb(255, 255, 255); stroke-width: 0; vertical-align: bottom;">
      <path d="M13.764 18.75c-.792.772-.808 2.037-.04 2.828.772.792 2.038.81 2.83.04l5.678-5.526v23.59h4v-23.59l5.68 5.525c.79.77 2.058.753 2.827-.04.377-.388.565-.89.565-1.394 0-.52-.202-1.042-.605-1.434L24.23 8.566 13.763 18.75z"></path>
    </svg>${farenheitToCelsius(forecastToday.high)}&#xb0;`;

    document.querySelector('#temp-min').innerHTML = `<svg width="20" height="20" viewBox="0 0 48 48" data-icon="arrow-down" style="fill: rgb(255, 255, 255); stroke: rgb(255, 255, 255); stroke-width: 0; vertical-align: bottom;">
                          <path d="M34.7 29.5c.793-.773.81-2.038.04-2.83-.77-.79-2.037-.81-2.83-.038l-5.677 5.525V8.567h-4v23.59l-5.68-5.525c-.79-.77-2.058-.753-2.827.04-.378.388-.566.89-.566 1.394 0 .52.202 1.042.605 1.434l10.472 10.183L34.7 29.5z"></path>
                        </svg>${farenheitToCelsius(forecastToday.low)}&#xb0;`;

    // update forecast
    updateForecast(forecast);
    // update other info
  }

  /**
   * Update 5 day forecast
   * @param {object} forecast - object containing forecast information
   */
  function updateForecast(forecast) {
    let forecastContainer = document.querySelector('#daily-forecast');

    forecastContainer.innerHTML = '';
    // create 5 day forecast
    // for (let i = 1; i = 5; i++) {
      let forecastForDay = forecast[1];

      // let forecastTemplate = `<div class="forecast">
      //     <div class="forecast-day">
      //         ${forecastForDay.day}
      //     </div>
      //     <div class="forecast-cond">
      //         <img src="./../icons/${getConditionIcon(forecastForDay.code)}.png">
      //     </div>
      //     <div class="forecast-temp">
      //         <span class="max">${farenheitToCelsius(forecastForDay.high)}&#xb0;</span>
      //         <span class="min">${farenheitToCelsius(forecastForDay.low)}&#xb0;</span>
      //     </div>
      // </div>`;

      let forecastTemplate = document.createElement('div');
      forecastTemplate.className = "forecast";

      let forecastDay = document.createElement('div');
      forecastDay.className = "forecast-day";
      forecastDay.innerText =  `${forecastForDay.day}`;

      let forecast_cond = document.createElement('div');
      forecast_cond.className = "forecast-cond";

      let cond_icon = document.createElement('img');
      cond_icon.src = `./../icons/${getConditionIcon(forecastForDay.code)}.png`;

      let forecast_temp = document.createElement('div');
      forecast_temp.className = "forecast-temp";

      let forecast_temp_min = document.createElement('span');
      forecast_temp_min.className = "min";
      forecast_temp_min.innerHTML = `${farenheitToCelsius(forecastForDay.low)}&#xb0;`;

      let forecast_temp_max = document.createElement('span');
      forecast_temp_max.className = "max";
      forecast_temp_max.innerHTML = `${farenheitToCelsius(forecastForDay.high)}&#xb0;`;

      forecast_temp.appendChild(forecast_temp_min);
      forecast_temp.appendChild(forecast_temp_max);

      forecast_cond.appendChild(cond_icon);

      forecastTemplate.appendChild(forecastDay);
      forecastTemplate.appendChild(forecast_cond);
      forecastTemplate.appendChild(forecast_temp);

      // Add day forecast in forecast container
      forecastContainer.appendChild(forecastTemplate);
    // }
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

  /**
   * Get single weather code for related condition codes
   * @param {number} weatherCode - weather condition code
   * @return {number} code - related weather code
   */
  function getConditionIcon(weatherCode) {
    // Weather codes: https://developer.yahoo.com/weather/documentation.html#codes
    weatherCode = parseInt(weatherCode);
    switch (weatherCode) {
      case 25: // cold
      case 32: // sunny
      case 33: // fair (night)
      case 34: // fair (day)
      case 36: // hot
      case 3200: // not available
        return 32; //'clear-day';
      case 0: // tornado
      case 1: // tropical storm
      case 2: // hurricane
      case 6: // mixed rain and sleet
      case 8: // freezing drizzle
      case 9: // drizzle
      case 10: // freezing rain
      case 11: // showers
      case 12: // showers
      case 17: // hail
      case 35: // mixed rain and hail
      case 40: // scattered showers
        return 11; //'rain';
      case 3: // severe thunderstorms
      case 4: // thunderstorms
      case 37: // isolated thunderstorms
      case 38: // scattered thunderstorms
      case 39: // scattered thunderstorms (not a typo)
      case 45: // thundershowers
      case 47: // isolated thundershowers
        return 4; //'thunderstorms';
      case 5: // mixed rain and snow
      case 7: // mixed snow and sleet
      case 13: // snow flurries
      case 14: // light snow showers
      case 16: // snow
      case 18: // sleet
      case 41: // heavy snow
      case 42: // scattered snow showers
      case 43: // heavy snow
      case 46: // snow showers
        return 16; //'snow';
      case 15: // blowing snow
      case 19: // dust
      case 20: // foggy
      case 21: // haze
      case 22: // smoky
        return 20; //'fog';
      case 24: // windy
      case 23: // blustery
        return 24; //'windy';
      case 26: // cloudy
      case 27: // mostly cloudy (night)
      case 28: // mostly cloudy (day)
      case 31: // clear (night)
        return 26; //'cloudy';
      case 29: // partly cloudy (night)
      case 30: // partly cloudy (day)
      case 44: // partly cloudy
        return 30; //'partly-cloudy-day';
    }
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
})();

//32 11 4 16 20 24 26 30
