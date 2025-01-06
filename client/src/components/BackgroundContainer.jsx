import { useState } from "react"
import "../styles/BackgroundContainer.css";
import SearchBar from "./SearchBar.jsx";
import WeatherDetails from "./WeatherDetails.jsx";

function BackgroundContainer() {
  const [weatherData, setWeatherData] = useState(null);

  return (
    <>
      <div className="background-container">
        <WeatherDetails weatherData={weatherData} />
        <SearchBar setWeatherData={setWeatherData} />
      </div>
    </>
  );
}

export default BackgroundContainer;
