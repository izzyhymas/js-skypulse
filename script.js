"use strict";

document.addEventListener("DOMContentLoaded", async function () {
  // Current Weather Condition and Temp
  const getCurrentForecast = async () => {
    const currentForecast = await fetch(
      "https://api.weather.gov/gridpoints/SLC/20,19/forecast/hourly"
    );
    const data = await currentForecast.json();
    const currentWeather = data["properties"]["periods"][0]["shortForecast"];
    const currentTemp = data["properties"]["periods"][0]["temperature"];
    console.log(`Current Weather Conditions: ${currentWeather}`);
    console.log(`Current Temperature: ${currentTemp}`);

    document.getElementById("current-temp").innerHTML = currentTemp;
    document.getElementById("current-condition").innerHTML = currentWeather;
  };

  // 24 Hour Weather
  const get24HourForecast = async () => {
    const dailyForecast = await fetch(
      "https://api.weather.gov/gridpoints/SLC/20,19/forecast/hourly"
    );
    const data2 = await dailyForecast.json();
    const forecast = data2["properties"]["periods"];

    const hourlyForecast = [];

    for (let i = 0; i < 24; i++) {
      const getHourlyForecast = forecast[i]["temperature"];
      hourlyForecast.push(getHourlyForecast);
    }
    console.log(`24 Hour Forecast: ${hourlyForecast}`);
    document.getElementById("hourly-weather").innerHTML = hourlyForecast;
  };

  // Weekly Forecast
  const days = [];
  const temp = [];
  const getWeeklyForecast = async () => {
    const weeklyForecast = await fetch(
      "https://api.weather.gov/gridpoints/SLC/20,19/forecast"
    );
    const data4 = await weeklyForecast.json()
    const forecast = data4["properties"]["periods"];

    for (let i = 0; i < forecast.length; i++) {
      const getDay = forecast[i]["name"];
      const getTemp = forecast[i]["temperature"];
      days.push(getDay);
      temp.push(getTemp);
    }
    console.log(days);
    console.log(temp);
    const ctx = document.getElementById("myChart");
    const data = [
      { day: days[0], temp: temp[0] },
      { day: days[1], temp: temp[1] },
      { day: days[2], temp: temp[2] },
      { day: days[3], temp: temp[3] },
      { day: days[4], temp: temp[4] },
      { day: days[5], temp: temp[5] },
      { day: days[6], temp: temp[6] },
      { day: days[7], temp: temp[7] }
    ];

    new Chart(ctx, {
      type: "line",
      data: {
        labels: data.map((row) => row.day),
        datasets: [
          {
            label: "Daily Temperature",
            data: data.map((row) => row.temp),
          },
        ],
      },
    });
  };

  // Alerts
  const getWeatherAlert = async () => {
    const weatherAlert = await fetch(
      "https://api.weather.gov/alerts/active?area=UT"
    );
    const data3 = await weatherAlert.json();
    const alert = data3["features"][0]["properties"]["event"];
    console.log(`Weather Alert: ${alert}`);

    document.getElementById("weather-alert").innerHTML = alert;
  };

  getCurrentForecast();
  get24HourForecast();
  getWeatherAlert();
  getWeeklyForecast();
});
