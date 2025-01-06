import { useState } from "react";
import "../styles/WeatherDetails.css";
import lightRain from '../assets/rain_icon.png'

function WeatherDetails({ weatherData }) {
  function getTime() {
    let date = new Date();
    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
  }

  return (
    <>
      <div className="wd-container">
        <div className="icon-container">
          <img src={lightRain} />
        </div>
        <div className="details-container">
          <p>{weatherData ? `${weatherData.main.temp} ºC` : ""}</p>
          <div className="location">
            <p>{weatherData ? `${weatherData.name}, ${weatherData.sys.country}` : ""}</p>
            <p>{weatherData ? getTime() : ""}</p>
          </div>
          <div className="more-details">
            <p>{weatherData ? `${weatherData.weather[0].main}` : ""}</p>
            <p>{weatherData ? `Humidity: ${weatherData.main.humidity}%` : ""}</p>
            <p>{weatherData ? `Wind: ${weatherData.wind.speed} km/hr` : ""}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default WeatherDetails;