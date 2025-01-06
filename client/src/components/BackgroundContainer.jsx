import { useState } from "react"
import "../styles/BackgroundImage.css";
import SearchBar from "./SearchBar.jsx";
import WeatherDetails from "./WeatherDetails.jsx";

function BackgroundContainer() {
  return (
  <>
    <div className="background-container">
      <SearchBar></SearchBar>
      <WeatherDetails></WeatherDetails>
    </div>
  </>
  )
}

export default BackgroundContainer;

