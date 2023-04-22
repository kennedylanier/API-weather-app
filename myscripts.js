// setting API key
const apiKey = '63b094870dece07d4d3bb34799023082';

// define function to get weather data, user enters zip
function getWeatherData(zipCode) {
  // create API call to get latitude and longitude of location from zip code, conversion will take place somehow, haven't totally wrapped my head around it
  const zipData = `https://api.openweathermap.org/geo/1.0/zip?zip=${zipCode}&appid=${apiKey}`;
  // fetch the data and convert to JSON
  fetch(zipData)
    .then(response => response.json())
    .then(data => {
      // get latitude, longitude, and city name from user data
      const lat = data.lat;
      const lon = data.lon;
      const city = data.name;
      // API call to get weather data from latitude and longitude
      const latLonData = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
      // fetching weather data and converting to JSON
      return fetch(latLonData);
    })
    .then(response => response.json())
    .then(data => {
      // get current date, current temperature, current conditions, temp high, and temp low from data
      const todaysDate = new Date(data.current.dt * 1000).toLocaleDateString();
      const currentTemp = Math.round(data.current.temp);
      const Currentconditions = data.current.weather[0].description;
      const high = Math.round(data.daily[0].temp.max);
      const low = Math.round(data.daily[0].temp.min);
      // string to display weather data, including city name
      const displayString = `Current Date: ${todaysDate}<br>City: ${city}<br>Current Temperature: ${currentTemp}&deg;F<br>Current conditions: ${Currentconditions}<br>Temp High/Low: ${high}/${low}&deg;F`;
      // display the weather data on the webpage
      document.getElementById('weather-data').innerHTML = displayString;
    })
    .catch(error => console.error(error));
}

// add event listener to the form to trigger the getWeatherData function when the user submits the form
document.getElementById('user-zip').addEventListener('submit', event => {
  // prevent the default form submission behavior
  event.preventDefault();
  // get the zip code from the input field
  const zipCode = document.getElementById('user-zip').value;
  // call the getWeatherData function with the zip code
  getWeatherData(zipCode);
});

