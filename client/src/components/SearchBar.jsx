import { useState } from "react";
import "../styles/SearchBar.css";

async function fetchPOST(url, formData) {
  try {
    const rawResponse = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData)
    })

    if (!rawResponse.ok) {
      const errorDetails = await rawResponse.text();
      throw new Error(`HTTP error! Status: ${rawResponse.status}, Details: ${errorDetails}`);
    }

    return rawResponse.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function getCurrentLocation() {
  
}

function SearchBar({setWeatherData}) {
  const [city, setCity] = useState("");
  const [locations, setLocations] = useState([]);

  const geoLocateCity = async (event) => {
    event.preventDefault();

    if (city) {
      const obj = {
        city: city.trim()
      };

      const response = await fetchPOST("http://localhost:8080/geolocation", obj);
      setLocations(response || []);
    }
  }

  const handleOnClick = async (location) => {
    if (location) {
      const obj = {
        lat: location.lat,
        lon: location.lon
      }

      const response = await fetchPOST("http://localhost:8080/curr_weather", obj);
      setWeatherData(response);
    }
  }

  return (
    <>
      <div className="search-container">
        <form onSubmit={geoLocateCity}>
          <input type="text"
            name="city"
            placeholder="Enter A City..."
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
              setLocations([]);
            }} />
          <button type="submit">Submit</button>
        </form>
        <div className="locations-container">
          {locations.map((location, index) => (
            <div key={index}>
              <button
                className="location-button"
                onClick={() => handleOnClick(location)}
              >
                {`${location.name}, ${location.country}`}
              </button>
              <br />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default SearchBar