
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

    temperatureElement.innerHTML=Math.round(response.data.main.temp);
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

let apiKey="5b13a7aa411fef5e82602961817af14c";
let city="Paris";
let apiUrl=`https://api.openweathermap.org/data/2.5/weather?
q=${city}&appid=${apiKey}`;
 
axios.get(apiUrl).then(displayTemperature);