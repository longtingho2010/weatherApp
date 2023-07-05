const apikey = "46f80a02ecae410460d59960ded6e1c6";
const weatherDataEl = document.getElementById("weather-data");
const cityInputEl = document.getElementById("city");
const formEl = document.querySelector("form");

async function getWeatherData(cityValue) {
  try {
    const resopnse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`
    );

    const data = await resopnse.json();
    const temperature = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;
    const details = [
      `Feels like: ${Math.round(data.main.feels_like)}°C`,
      `Humidity: ${data.main.humidity}%`,
      `Wind Speed: ${data.wind.speed} m/s`,
    ];

    weatherDataEl.querySelector(".icon").innerHTML = `<img
    src="http://openweathermap.org/img/wn/${icon}.png
    "alt="Weather Icon"
  />`;

    weatherDataEl.querySelector(".temperature").innerText = `${temperature}°C`;

    weatherDataEl.querySelector(".description").innerText = `${description}`;

    weatherDataEl.querySelector(".details").innerHTML = details
      .map((detail) => `<div>${detail}</div>`)
      .join("");
  } catch (error) {
    alert("Not an existing city, please try again");
  }
}

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  const cityValue = cityInputEl.value;
  getWeatherData(cityValue);
});
