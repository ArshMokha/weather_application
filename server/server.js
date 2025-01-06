const express = require ("express");
const axios = require ("axios");
const cors = require ("cors");
require('dotenv').config();

const app = express();
const corsOptions = {
  origin: "http://localhost:5173"
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded());

app.post("/geolocation", async (req, res) => {
  const { city } = req.body;

  try {
    const apiURL = `${process.env.GEO_API_URL}?q=${city}&limit=5&appid=${process.env.WEATHER_API_KEY}`;
    const apiResponse = await axios.get(apiURL);

    if (!apiResponse.data || apiResponse.data.length === 0) {
      return res.status(404).json({error: "Location Not Found"});
    }

    res.json(apiResponse.data);
  } catch (error) {
    res.status(500).json({error: "Internal Server Error"});
  }
})

app.post("/curr_weather", async (req, res) => {
  const {lat, lon} = req.body;

  try {
    const apiURL = `${process.env.CURR_WEATHER_API_URL}?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.WEATHER_API_KEY}`;
    const apiResponse = await axios.get(apiURL);

    if (!apiResponse.data) {
      return res.status(404).json({error: "Current Weather Not Found"});
    }

    res.json(apiResponse.data);
  } catch (error) {
    res.status(500).json({error: "Internal Server Error"});
  }
})
// app.post("/curr_weather", async (req, res) => {
//   const {lat, lon} = req.body;

//   try {
//     const apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}`

//     const apiResponse = await axios.get(apiURL);

//     res.json(apiResponse.data);
//   } catch (error) {
//     console.error("Error Fetching Weather Details:", error);
//     res.status(500).json({error: "Internal Server Error"});
//   }
// })

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Listening from port: ${port}`);
})