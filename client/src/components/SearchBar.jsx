import { useState, useEffect } from "react";
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

function SearchBar({ setWeatherData }) {
  const [city, setCity] = useState("");
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    if (city.length === 0) {
      showcaseFavourites();
    }
  }, [city]);

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

      console.log(location);

      const response = await fetchPOST("http://localhost:8080/curr_weather", obj);
      setWeatherData(response);
    }
  }

  async function showcaseFavourites() {
    setLocations([]);

    try {
      const rawResponse = await fetch("http://localhost:8080/favourites/get", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "authorization": localStorage.getItem("token")
        }
      });

      const response = await rawResponse.json();

      setLocations(response);
    } catch (err) {
      console.log("Something went wrong:", err);
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

        {city.length === 0 && locations.length > 0 && (
          <h3>Favourites</h3>
        )}

        {city.length > 0 && locations.length > 0 && (
          <h3>Suggested</h3>
        )}

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