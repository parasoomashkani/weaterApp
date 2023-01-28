
function formatDate(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
      hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
  
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`;
  }
  function displayForecast() {
    let forecastElement = document.querySelector("#forecast");
  
    let days = ["Thu", "Fri", "Sat", "Sun","Mon","Teu",];
  
    let forecastHTML = `<div class="row">`;
    days.forEach(function (day) {
      forecastHTML =
        forecastHTML +
        `
        <div class="col-2">
          <div class="weather-forecast-date">${day}</div>
          <img
            src="http://openweathermap.org/img/wn/50d@2x.png"
            alt=""
            width="42"
          />
          <div class="weather-forecast-temperatures">
            <span class="weather-forecast-temperature-max"> 18° </span>
            <span class="weather-forecast-temperature-min"> 12° </span>
          </div>
        </div>
    `;
    });
  
    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
    console.log(forecastHTML);
  }
function displayTemperature(response){
    console.log(response.data);
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let description = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let feelsLike = document.querySelector("#feels");
    let dateElement = document.querySelector("#date");
    let iconElement = document.querySelector("#icon");


    cityElement.innerHTML=response.data.name;

    celsiusTemperature = response.data.main.temp-273;

    temperatureElement.innerHTML = Math.round(celsiusTemperature);
   
    description.innerHTML=response.data.weather[0].description;  
    humidityElement.innerHTML=response.data.main.humidity;
    windElement.innerHTML=Math.round(response.data.wind.speed);
    feelsLike.innerHTML=Math.round(response.data.main.feels_like-273);
    dateElement.innerHTML=formatDate(response.data.dt*1000);
    iconElement.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    iconElement.setAttribute("alt", response.data.weather[0].description);
  
}

function search(city){
let apiKey="5b13a7aa411fef5e82602961817af14c";
let apiUrl=`https://api.openweathermap.org/data/2.5/weather?
q=${city}&appid=${apiKey}`;
axios.get(apiUrl).then(displayTemperature);
}

function  handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

search("New York");
let form = document.querySelector("#search-form");
form.addEventListener("submit",  handleSubmit);

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheiTemperature = ( celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;


let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

displayForecast();

