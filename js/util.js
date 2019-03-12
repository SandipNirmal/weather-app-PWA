/**
 * Util.js
 *
 * Contains all utility methods for weather app
 */

window.Util = (function Utils() {

  // initial weather data to initialise
  const initialWeatherData = {
    "units": {
      "distance": "mi",
      "pressure": "in",
      "speed": "mph",
      "temperature": "F"
    },
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
      "link": "http://us.rd.yahoo.com/dailynews/rss/weather/Country__Country/*https://weather.y" +
          "ahoo.com/country/state/city-2295412/",
      "pubDate": "Wed, 21 Dec 2016 10:30 AM IST",
      "condition": {
        "code": "30",
        "date": "Wed, 21 Dec 2016 10:30 AM IST",
        "temp": "91",
        "text": "Clear"
      },
      "forecast": [
        {
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
        }
      ],
      "description": "<![CDATA[<img src=\"http://l.yimg.com/a/i/us/we/52/30.gif\"/>\n<BR />\n<b>Curren" +
          "t Conditions:</b>\n<BR />Partly Cloudy\n<BR />\n<BR />\n<b>Forecast:</b>\n<BR />" +
          " Wed - Partly Cloudy. High: 85Low: 57\n<BR /> Thu - Partly Cloudy. High: 86Low: " +
          "62\n<BR /> Fri - Partly Cloudy. High: 87Low: 59\n<BR /> Sat - Sunny. High: 88Low" +
          ": 61\n<BR /> Sun - Sunny. High: 88Low: 63\n<BR />\n<BR />\n<a href=\"http://us.r" +
          "d.yahoo.com/dailynews/rss/weather/Country__Country/*https://weather.yahoo.com/co" +
          "untry/state/city-2295412/\">Full Forecast at Yahoo! Weather</a>\n<BR />\n<BR />" +
          "\n(provided by <a href=\"http://www.weather.com\" >The Weather Channel</a>)\n<BR" +
          " />\n]]>",
      "guid": {
        "isPermaLink": "false"
      }
    }
  };

  // Utils constructor function Util() { } publicly exposed methods
  return {
    initialWeatherData,
    getWindDirection,
    getConditionIcon,
    farenheitToCelsius,
    celsiusToFarenheit,
    pressureInchesToMillibar,
    pressureMillibarToInches,
    getAuthToken,
    getFormattedDate
  };

  // return Util;

  /**
   * Converts wind direction andgle in degrees to human readable wind
   * direction values.
   * @param {number} direction - wind direction in degrees (0 - 360)
   * @return {string} direction in human readble form
   */
  function getWindDirection(direction) {
    let windDirection = 'N';

    if (direction > 348.75 || direction < 11.25) {
      windDirection = "N";
    } else if (direction > 11.25 && direction < 33.75) {
      windDirection = "NNE";
    } else if (direction > 33.75 && direction < 56.25) {
      windDirection = "NE";
    } else if (direction > 56.25 && direction < 78.75) {
      windDirection = "ENE";
    } else if (direction > 78.75 && direction < 101.25) {
      windDirection = "E";
    } else if (direction > 101.25 && direction < 123.75) {
      windDirection = "ESE";
    } else if (direction > 123.75 && direction < 146.25) {
      windDirection = "SE";
    } else if (direction > 146.25 && direction < 168.75) {
      windDirection = "SSE";
    } else if (direction > 168.75 && direction < 191.25) {
      windDirection = "S";
    } else if (direction > 191.25 && direction < 213.75) {
      windDirection = "SSW";
    } else if (direction > 213.75 && direction < 236.25) {
      windDirection = "SW";
    } else if (direction > 236.25 && direction < 258.75) {
      windDirection = "WSW";
    } else if (direction > 258.75 && direction < 281.25) {
      windDirection = "W";
    } else if (direction > 281.25 && direction < 303.75) {
      windDirection = "WNW";
    } else if (direction > 303.75 && direction < 326.25) {
      windDirection = "NW";
    } else if (direction > 326.25 && direction < 348.75) {
      windDirection = "NNW";
    }

    return windDirection;
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
   * Converts atmospheric pressure from inches to millibar
   * @param {number} pressure - pressure value in inches
   * @return {number} pressure value in millibars
   */
  function pressureInchesToMillibar(pressure) {
    return Math.round(33.8637526 * pressure, 2);
  }

  /**
   * Converts atmospheric pressure from millbar to inches
   * @param {number} pressure - pressure value in millibar
   * @return {number} pressure value in inches
   */
  function pressureMillibarToInches(pressure) {
    return Math.round(0.0295301 * pressure, 2);
  }

  /**
   * Generates OAuth token for Yahoo Weather API
   */
  function getAuthToken(location) {
    const concat = '&';
    const method = 'GET';
    const oauth = {
      'oauth_consumer_key': Constant.CONSUMER_KEY,
      'oauth_nonce': Math
        .random()
        .toString(36)
        .substring(2),
      'oauth_signature_method': 'HMAC-SHA1',
      'oauth_timestamp': parseInt(new Date().getTime() / 1000).toString(),
      'oauth_version': '1.0'
    };

    const merged = Object.assign({}, {...location, 'format': 'json'}, oauth)
    // Note the sorting here is required
    const merged_arr = Object
      .keys(merged)
      .sort()
      .map(function (k) {
        return [k + '=' + encodeURIComponent(merged[k])];
      });

    const signature_base_str = method + concat + encodeURIComponent(Constant.API_URL) + concat + encodeURIComponent(merged_arr.join(concat));

    const composite_key = encodeURIComponent(Constant.CONSUMER_SECRET) + concat;
    const hash = CryptoJS.HmacSHA1(signature_base_str, composite_key);
    const signature = hash.toString(CryptoJS.enc.Base64);

    oauth['oauth_signature'] = signature;
    return 'OAuth ' + Object
      .keys(oauth)
      .map((k) => [k + '="' + oauth[k] + '"'])
      .join(',');
  }

  /**
   * Returns date in LocaleDateString and time
   * 
   * @param {number} timestamp - timestamp in second
   * @returns {string} formatted date string
   */
  function getFormattedDate(timestamp) {
    const pubDate = new Date(timestamp * 1000)

    // return pubDate.toLocaleString()

    return `${pubDate.toDateString()} ${pubDate.toLocaleTimeString()}`
  }

})();
