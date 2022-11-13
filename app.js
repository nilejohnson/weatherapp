
// select elements:
const iconElement = document.querySelector(".weather-icon")
const tempElement = document.querySelector(".temperature-value p")
const descElement = document.querySelector(".temperature-description p")
const locationElement = document.querySelector(".location")
const notificationElement = document.querySelector(".notification")

// App data
const weather = {};

weather.temperature = {
    unit: "celsius"
}

// APP CONSTANTS
const KELVIN = 273;
//API KEY
const key = 'd05c0aa7454a79fdaef8bbeac48078e0';

// CHECK IF BROWSER SUPPORTS GEOLOCATION
if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browser doesn/'t support Geolocation</p>"
}

// SET USERS POSITION
function setPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude, longitude)
}

//SHOW ERROR WHEN THERE IS AN ERROR WITH GEOLOCATION SERVICE
function showError(error) {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p>${error.message}</p>`
}

//GET WEATHER FROM API
function getWeather(latitude, longitude) {
 //let api = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&appid=${key}`
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`
    // console.log(api);
    fetch(api)
        .then(function(response){
            let data = response.json();
            console.log(data)
            return data;
        })
        .then(function(data) {
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            console.log(data.weather[0].icon)
            weather.city = data.name;
            weather.country = data.sys.country;
        })
        .then(function(){
            displayWeather()
        })
}

// DISPLAY WEATHER
function displayWeather() {
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}

// <img src="icons/unknown.png">

// C to F
function celsiusToFahrenheit(temperature) {
    return (temperature * 9/5) + 32;
}

// WHEN USER CLICKS ON TEMPERATURE ELEMENT
tempElement.addEventListener("click", function() {
    if(weather.temperature.value === undefined) return;

    if(weather.temperature.unit == "celsius") {
        let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit)

        tempElement.innerHTML = `${fahrenheit}°<span>F</span>`
        weather.temperature.unit = "fahrenheit";
    } else {
        tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
        weather.temperature.unit = "celsius"
    }
    });