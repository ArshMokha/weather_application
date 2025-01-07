import { useState, useEffect } from "react";
import "../styles/WeatherDetails.css";

function WeatherDetails({ weatherData, icon }) {

  function getTime() {
    let date = new Date();
    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  }

  const handleFavClick = async (event) => {
    const data = {
      lat: weatherData.coord.lat,
      lon: weatherData.coord.lon,
      name: weatherData.name,
      country: weatherData.sys.country
    }

    const rawResponse = await fetch("http://localhost:8080/favourite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authorization": localStorage.getItem("token")
      },
      body: JSON.stringify(data)
    });
  };

  const getIconImage = (iconCode) => {
    return `/icons/${iconCode}.png`; 
  };

  return (
    <>
      <div className="wd-container">
        <div className="icon-container">
          <img src={icon ? getIconImage(icon) : ""} alt="Weather Icon" />
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
            <button onClick={handleFavClick}>Favourite</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default WeatherDetails;
