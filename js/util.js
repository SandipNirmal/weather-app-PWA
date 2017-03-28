/**
 * Util.js
 *
 * Contains all utility methods for weather app
 */

window.Util = (function Utils() {

  // Utils constructor
  // function Util() { }

  // publicly exposed methods
  return {
    getWindDirection: getWindDirection,
    getConditionIcon: getConditionIcon,
    farenheitToCelsius: farenheitToCelsius,
    celsiusToFarenheit: celsiusToFarenheit,
    pressureInchesToMillibar: pressureInchesToMillibar,
    pressureMillibarToInches: pressureMillibarToInches
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

})();
