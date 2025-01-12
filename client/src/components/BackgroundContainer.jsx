import { useState, useEffect } from "react"
import "../styles/BackgroundContainer.css";
import SearchBar from "./SearchBar.jsx";
import WeatherDetails from "./WeatherDetails.jsx";

function BackgroundContainer() {
  const [weatherData, setWeatherData] = useState(null);
  const [icon, setIcon] = useState(null);

  useEffect(() => {
    if (weatherData) {
      const iconCode = weatherData.weather[0].icon;
      setIcon(iconCode);
    }
  }, [weatherData]);

  const getImagePath = (icon) => {
    return `/images/${icon}.jpg`;
  }
  

  return (
    <>
      <div className="background-container" style={{
        backgroundImage: `url(${icon ? getImagePath(icon) : ""})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat"
      }}>
        <WeatherDetails weatherData={weatherData} icon={icon} />
        <SearchBar setWeatherData={setWeatherData} />
      </div>
    </>
  );
}

export default BackgroundContainer;
