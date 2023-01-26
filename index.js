
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
  function displayForecast(){
    let forecast=document.querySelector("#forecast");
    let forecastHTML="";
forecastElement.innerHTML=`
<div class="row">
<div class="col-2">
        <div class="weather-forecast-date">
                Thu
        </div>
        <img src="https://ssl.gstatic.com/onebox/weather/48/sunny.png" alt=""
        width="56"/>
        <div class="weather-forecast-temperature">
                <span class="weather-forecaste-temperature-max">
                        10
                </span>
                /
                <span class="weather-forecast-temperature-min">
                        12
                </span>
        </div>
</div>
</div>

`

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

  
    temperatureElement.innerHTML=
    Math.round(response.data.main.temp);
    description.innerHTML=response.data.weather[0].description;  
    humidityElement.innerHTML=response.data.main.humidity;
    windElement.innerHTML=Math.round(response.data.wind.speed);
    feelsLike.innerHTML=Math.round(response.data.main.feels_like);
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
  let fahrenheiTemperature = (celsiusTemperature * 9) /5 -273 + 32;
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
