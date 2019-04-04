/**
 * app.js
 *
 * 04/01/2017
 * @author Sandip Nirmal
 */

(function () {
  'use strict';

  // App configs
  const app = {
    daysOfWeek: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    refreshBtn: document.getElementById('btnRefresh'),
    lastKnownLocation: {},
    currentLocation: {},
    yahooWeatherApi: Constant.API_URL,
    lat: 18.491196888942024,
    lon: 73.7923624709481,
    locationFound: false
  };

  app.refreshBtn.addEventListener('click', getCurrentLocation);

  // Make weather data request for latest Data
  //getLatestWeather();
  getCurrentLocation();

  /**
   * Handles window scroll event, apply position fixed to current weather
   * container once it is scrolled past header
   */
  // function handleScroll() {}

  /**
   * Fetch latest weather info using yahoo weather API
   */
  function getLatestWeather() {

    let savedWeatherData = JSON.parse(getWeatherData());

    // If we have locally stored data and it's not older than 1 hour, use it.
    // else fetch data from network
    // TODO - Add changes for to support location changes to fetch fresh data
    if (savedWeatherData &&
      (savedWeatherData.dataSavedAt > (new Date().getTime() - (60 * 60 * 1000)))) {
      updateWeatherData(savedWeatherData.data);
    } else {
      const {lat, lon} = app.currentLocation

      const params = lat
        ? `lat=${lat}&lon=${lon}`
        : `lat=${app.lat}&lon=${app.lon}`;

      const url = `${app.yahooWeatherApi}?${params}&format=json`;

      let headers = new Headers();
      headers.set('Authorization', Util.getAuthToken({
        lat: lat ? lat : app.lat,
        lon: lon ? lon : app.lon
      }));

      fetch(url, {headers})
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
        updateWeatherData(res)
      })
      .catch((e) => {console.log('error', e)})
    }
  }

  /**
   * Updates UI with latest weather data, by extracting information from API
   * results
   */
  function updateWeatherData(weatherData) {
    console.log('Weather Data', weatherData);

    // Destruct weatherData object to get required values
    let {
      current_observation: {
        // location,
        // item: {
        //   forecast,
        //   condition: current
        // },
        astronomy,
        atmosphere,
        wind,
        condition: current,
        pubDate: buildDate
      },
      location,
      forecasts
    } = weatherData;

    // today's forecast
    let forecastToday = forecasts[0];

    // update header and basic info
    document.querySelector('.city-info .place').innerText = `${location.city},${location.region}`;
    document.querySelector('.city-info .time').innerText = `${Util.getFormattedDate(buildDate)}
(Last Updated)`;

    document.querySelector('.city-info .locationErr').style.display = app.locationFound ? 'none' : 'block';

    document.querySelector('#currentWeather .w-cond .cond-code').src = `./../icons/${Util.getConditionIcon(current.code)}.png`;
    document.querySelector('#currentWeather .w-cond .cond').innerText = `${current.text}`;
    document.querySelector('#currentWeather .cur-temp span').innerHTML = `${Util.farenheitToCelsius(current.temperature)}&#xb0;`;

    document.querySelector('#temp-max').innerHTML = `<svg width="20" height="20" viewBox="0 0 48 48" data-icon="arrow-up" style="fill: rgb(255, 255, 255); stroke: rgb(255, 255, 255); stroke-width: 0; vertical-align: bottom;">
      <path d="M13.764 18.75c-.792.772-.808 2.037-.04 2.828.772.792 2.038.81 2.83.04l5.678-5.526v23.59h4v-23.59l5.68 5.525c.79.77 2.058.753 2.827-.04.377-.388.565-.89.565-1.394 0-.52-.202-1.042-.605-1.434L24.23 8.566 13.763 18.75z"></path>
    </svg>${Util.farenheitToCelsius(forecastToday.high)}&#xb0;`;

    document.querySelector('#temp-min').innerHTML = `<svg width="20" height="20" viewBox="0 0 48 48" data-icon="arrow-down" style="fill: rgb(255, 255, 255); stroke: rgb(255, 255, 255); stroke-width: 0; vertical-align: bottom;">
                          <path d="M34.7 29.5c.793-.773.81-2.038.04-2.83-.77-.79-2.037-.81-2.83-.038l-5.677 5.525V8.567h-4v23.59l-5.68-5.525c-.79-.77-2.058-.753-2.827.04-.378.388-.566.89-.566 1.394 0 .52.202 1.042.605 1.434l10.472 10.183L34.7 29.5z"></path>
                        </svg>${Util.farenheitToCelsius(forecastToday.low)}&#xb0;`;

    // update forecast
    updateForecast(forecasts);

    // update other info
    updateWeatherInfo(wind, atmosphere, astronomy, current);
  }

  /**
   * Update 5 day forecast
   * @param {object} forecast - object containing forecast information
   */
  function updateForecast(forecast) {
    let forecastContainer = document.querySelector('#daily-forecast');

    forecastContainer.innerHTML = '';
    // create 5 day forecast
    for (let i = 1; i <= 5; i++) {
      let forecastForDay = forecast[i];

      let forecastTemplate = document.createElement('div');
      forecastTemplate.className = "forecast";

      let forecastDay = document.createElement('div');
      forecastDay.className = "forecast-day";
      forecastDay.innerText = `${forecastForDay.day}`;

      let forecast_cond = document.createElement('div');
      forecast_cond.className = "forecast-cond";

      let cond_icon = document.createElement('img');
      cond_icon.src = `./../icons/${Util.getConditionIcon(forecastForDay.code)}.png`;
      // Replace it with condition name
      cond_icon.alt = "Weather Condition"

      let forecast_temp = document.createElement('div');
      forecast_temp.className = "forecast-temp";

      let forecast_temp_min = document.createElement('span');
      forecast_temp_min.className = "min";
      forecast_temp_min.innerHTML = `${Util.farenheitToCelsius(forecastForDay.low)}&#xb0;`;

      let forecast_temp_max = document.createElement('span');
      forecast_temp_max.className = "max";
      forecast_temp_max.innerHTML = `${Util.farenheitToCelsius(forecastForDay.high)}&#xb0;`;

      forecast_temp.appendChild(forecast_temp_min);
      forecast_temp.appendChild(forecast_temp_max);

      forecast_cond.appendChild(cond_icon);

      forecastTemplate.appendChild(forecastDay);
      forecastTemplate.appendChild(forecast_cond);
      forecastTemplate.appendChild(forecast_temp);

      // Add day forecast in forecast container
      forecastContainer.appendChild(forecastTemplate);
    }
  }

  /**
   * Updates UI with other weather info such as wind, pressure, astronomy,
   * humidity, visibility
   * @param {object} wind - object having information related to wind
   * @param {object} atmosphere - atmosphere info such as pressure, humidity
   * @param {object} astronomy - astronomy information like sunrise ans sunset time
   * @param {object} current -cuurent weather info
   */
  function updateWeatherInfo(wind, atmosphere, astronomy, current) {
    // wind and pressure
    document.querySelector('.wind-pressure-forecast .wind').innerHTML = `Wind </br> ${wind.speed} mph ${Util.getWindDirection(wind.direction)}`;
    document.querySelector('.wind-pressure-forecast .pressure').innerHTML = `Barometer </br> ${atmosphere.pressure} milibars`;

    document.querySelector('.wind-pressure-forecast .wind-icon .turbine').src = `./../icons/turbine.png`;
    // document.querySelector('.wind-pressure-forecast .wind-icon .turbine-small').src = `./../icons/turbine.png`;

    // details
    document.querySelector('.weather-details .weather-condition-icon').src = `./../icons/${Util.getConditionIcon(current.code)}.png`;
    document.querySelector('.weather-details .feels-like').innerHTML = `${Util.farenheitToCelsius(current.temp)}&#xb0;`;
    document.querySelector('.weather-details .humidity').innerHTML = `${atmosphere.humidity} %`;
    document.querySelector('.weather-details .visibility').innerHTML = `${atmosphere.visibility} km`;

    // astronomy
    document.querySelector('.astro-details .sunrise').innerText = `${astronomy.sunrise}`;
    document.querySelector('.astro-details .sunset').innerText = `${astronomy.sunset}`;

    // draw astronomy image
    drawAstroImage(astronomy);
  }

  /**
   * Saves weather Data in localStorage alongwith timestamp
   * @param {object} data - weather data
   */
  function saveWeatherData(data) {
    let weatherData = {
      'dataSavedAt': new Date().getTime(),
      data: data
    };

    localStorage.setItem('weatherData', JSON.stringify(weatherData));
  }

  /**
   * Retrievs and returns weather data values stored locally
   */
  function getWeatherData() {
    return localStorage.getItem('weatherData');
  }

  /**
   * Draws astronomy image showing sunrise and sunset alongwith current sun
   * position
   */
  function drawAstroImage(astronomy) {
    const astro = document.getElementById('astro-img');

    if (astro.getContext) {
      const ctx = astro.getContext('2d');
      // clear canvas before drawing
      ctx.clearRect(0, 0, astro.clientWidth, astro.clientHeight);

      // Draw along the canvas
      // Straight line
      ctx.beginPath();
      ctx.moveTo(10, 100);
      ctx.lineTo(190, 100);
      ctx.strokeStyle = "#b1b1b1";
      ctx.stroke();
      ctx.closePath();

      // Arc displaying daytime
      ctx.beginPath();
      ctx.arc(100, 100, 90, 0, Math.PI, true);
      ctx.strokeStyle = "#a1a1a1";
      ctx.stroke()

      // Sun icon
      ctx.beginPath();
      ctx.arc(40, 36, 10, 0, Math.PI * 2, true);
      ctx.fillStyle = "#FDB813";
      ctx.fill();
      ctx.closePath();

      // Sunrise
      ctx.beginPath();
      ctx.fillStyle = "#a1a1a1";
      ctx.arc(10, 100, 4, 0, Math.PI * 2, true);
      ctx.arc(190, 100, 4, 0, Math.PI * 2, true);
      ctx.fill();

      ctx.fillStyle = "#e1e1e1";
      ctx.fillText(astronomy.sunrise, 0, 114);
      ctx.fillText(astronomy.sunset, 165, 114);
    }
  }

  /**
   * Tries to fetch current user location, if found returns current location
   * else returns last saved location
   */
  function getCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(data => {
        console.log(data);
        app.locationFound = true;
        updateLocationInfo(data);
      }, err => {
        console.log('Error occurred', err)
        // Use fallback location to fetch weather data
        getLatestWeather();
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

    app.currentLocation = {
      lat: lat,
      lon: lon
    };

    // update lastKnownLocation only if currentLocation values are defined
    lat && (app.lastKnownLocation.lat = lat);
    lon && (app.lastKnownLocation.lon = lon);

    // get latest weather info for current location
    getLatestWeather();
  }
})();
