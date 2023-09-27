const API_KEY = "9801cb79c8bf3ca97fa6088e7a4a6317";
const API_URL =
  "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

//DOM elements
const search = document.querySelector(".searchbar input");
const submit = document.querySelector(".searchbar button");
const icon = document.querySelector(".icon");
const unitSelect = document.getElementById("unitSelect");

submit.addEventListener("click", () => {
  const selectedUnit = unitSelect.value;
  weatherCheck(search.value, selectedUnit);
});

// Function to convert Celsius to Fahrenheit
function celsiusToFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}

//fetch
async function weatherCheck(city, units) {
  try {
    //fetch data from the open weather website
    const res = await fetch(
      API_URL + city + `&units=${units}&appid=${API_KEY}`
    );

    //error 
    if (res.status !== 200) {
      document.querySelector(".err").style.display = "block";
      return;
    }

    var data = await res.json();

    console.log(data);

    
    document.querySelector(".city").innerHTML = data.name;
    const celsiusTemp = Math.round(data.main.temp);
    const fahrenheitTemp = Math.round(celsiusToFahrenheit(celsiusTemp));
    const temperature =units === "metric" ? `${celsiusTemp} °C` : `${fahrenheitTemp} °F`;
    document.querySelector(".temp").innerHTML = temperature;
    document.querySelector(".humidity").innerHTML = data.main.humidity + " %";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";


    //function for the sunrise and sunset time
    let sunrise = data.sys.sunrise;
    let sunset = data.sys.sunset;
    function sunTime(timestamp) {
      var date = new Date(timestamp * 1000);
      var hr = date.getHours();
      var minutes = "0" + date.getMinutes();

      var ampm = hr >= 12 ? "PM" : "AM";
      hr = hr % 12;
      hr = hr ? hr : 12;
      var formatedTime = hr + ":" + minutes.substr(-2);
      return formatedTime + " " + ampm;
    }
    document.querySelector(".sunrise").innerHTML = sunTime(sunrise);
    document.querySelector(".sunset").innerHTML = sunTime(sunset);


    //adding icon based on weather
    if (data.weather[0].main == "Clouds") {
      icon.innerHTML = '<i class="fa-solid fa-cloud"></i>';
    } else if (data.weather[0].main == "Clear") {
      icon.innerHTML = '<i class="fa-solid fa-sun"></i>';
    } else if (data.weather[0].main == "Rain") {
      icon.innerHTML = '<i class="fa-solid fa-cloud-showers-heavy"></i>';
    } else if (data.weather[0].main == "Drizzle") {
      icon.innerHTML = '<i class="fa-solid fa-cloud-drizzle"></i>';
    } else if (data.weather[0].main == "Haze") {
      icon.innerHTML = '<i class="fa-solid fa-snowflake"></i>';
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }

  document.querySelector(".weather-details").style.display = "block";
}

//submit
submit.addEventListener("click", () => {
  const selectedUnit = unitSelect.value;
  weatherCheck(search.value, selectedUnit);
});


