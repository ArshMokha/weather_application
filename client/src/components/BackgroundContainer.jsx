import { useState, useEffect } from "react"
import "../styles/BackgroundContainer.css";
import SearchBar from "./SearchBar.jsx";
import WeatherDetails from "./WeatherDetails.jsx";

function BackgroundContainer() {
  const [weatherData, setWeatherData] = useState(null);
  const [icon, setIcon] = useState("");

  useEffect(() => {
    if (weatherData) {
      const iconCode = weatherData.weather[0].icon;
      setIcon(iconCode);
    }
  }, [weatherData]);

  

  return (
    <>
      <div className="background-container" style={{
        background: url(icon ? `/images/${icon}.jpg` : "")
      }}>
        <WeatherDetails weatherData={weatherData} icon={icon} />
        <SearchBar setWeatherData={setWeatherData} />
      </div>
    </>
  );
}

export default BackgroundContainer;
