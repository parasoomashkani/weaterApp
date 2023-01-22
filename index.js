
function displayTemperature(response){
    console.log(response.data);
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let description = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let feelsLike = document.querySelector("#feels");


    cityElement.innerHTML=response.data.name;

    temperatureElement.innerHTML=Math.round(response.data.main.temp);
    description.innerHTML=response.data.weather[0].description;  
    humidityElement.innerHTML=response.data.main.humidity;
    windElement.innerHTML=response.data.wind.speed;
    feelsLike.innerHTML=Math.round(response.data.main.feels_like);

}

let apiKey="5b13a7aa411fef5e82602961817af14c";
let apiUrl=`https://api.openweathermap.org/data/2.5/weather?
q=London&appid=${apiKey}`;
 
axios.get(apiUrl).then(displayTemperature);