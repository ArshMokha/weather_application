import { useState, useEffect } from "react";
import "../styles/BackgroundContainer.css";
import SearchBar from "./SearchBar.jsx";
import WeatherDetails from "./WeatherDetails.jsx";

function BackgroundContainer() {
  const [weatherData, setWeatherData] = useState(null);
  const [imageData, setImageData] = useState("");

  useEffect(() => {
    const fetchImage = async () => {
      if (!weatherData) return;

      try {
        const response = await fetch("http://localhost:8080/sdapi", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            weather: weatherData.weather[0].description,
          }),
        });

        if (!response.ok) {
          const errorDetails = await response.text();
          throw new Error(
            `HTTP error! Status: ${response.status}, Details: ${errorDetails}`
          );
        }

        const data = await response.json();
        console.log('Received image data:', data.image); 
        setImageData(`data:image/png;base64,${data.image}`);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchImage();
  }, [weatherData]); 

  useEffect(() => {
    if (imageData) {
      console.log(imageData);
    }
  }, [imageData]);

  return (
    <div 
      className="background-container"
      style={{backgroundImage: imageData ? `url(${imageData})` : "url(/images/01d.jpg)"}}
    >
      {/* {imageData && <img src={imageData} alt="Weather background" />} */}
      <WeatherDetails weatherData={weatherData} />
      <SearchBar setWeatherData={setWeatherData} />
    </div>
  );
}

export default BackgroundContainer;
