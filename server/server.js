const express = require("express");
const axios = require("axios");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const FormData = require('form-data');
require('dotenv').config();

const app = express();
const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:5173/home"]
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded());

mongoose.connect("mongodb://localhost:27017/weatherapp");

app.post("/geolocation", async (req, res) => {
  const { city } = req.body;

  try {
    const apiURL = `${process.env.GEO_API_URL}?q=${city}&limit=5&appid=${process.env.WEATHER_API_KEY}`;
    const apiResponse = await axios.get(apiURL);

    if (!apiResponse.data || apiResponse.data.length === 0) {
      return res.status(404).json({ error: "Location Not Found" });
    }
    
    res.json(apiResponse.data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
})

app.post("/curr_weather", async (req, res) => {
  const { lat, lon } = req.body;

  try {
    const apiURL = `${process.env.CURR_WEATHER_API_URL}?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.WEATHER_API_KEY}`;
    const apiResponse = await axios.get(apiURL);

    if (!apiResponse.data) {
      return res.status(404).json({ error: "Current Weather Not Found" });
    }

    res.json(apiResponse.data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
})

app.post("/register", (req, res) => {
  const userModel = require("./models/user.js");
  userModel.create(req.body)
    .then(user => {
      res.json(user)
    })
    .catch(err => {
      res.json(err)
    })
})

app.post("/login", (req, res) => {
  const userModel = require("./models/user.js");
  const { email, password } = req.body;

  userModel.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.password === password) {
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "3h" })
        res.status(200).json({ message: "Success", token });
      } else {
        res.status(401).json({ message: "Incorrect Password" });
      }
    } else {
      res.status(404).json({ message: "No Existing Record" });
    }
  }).catch((err) => {
    res.status(500).json({ message: "Internal Server Error" });
  })
})

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden" });
    }

    req.userId = decoded.userId;
    next();
  });
};

app.post("/favourite", authMiddleware, async (req, res) => {
  const userModel = require("./models/user.js");
  const { lat, lon, name, country } = req.body;

  try {
    const user = await userModel.findById(req.userId);

    if (!user) {
      return res.status(404).json("User Not Found");
    }

    const isClose = (a, b, tolerance = 0.0001) => Math.abs(a - b) < tolerance;

    const favouriteCheck = user.favourites.some((favourite) => {
      return (favourite.lat, lat &&
        favourite.lon, lon &&
        favourite.name === name &&
        favourite.country === country)
    })

    if (favouriteCheck) {
      await userModel.findByIdAndUpdate(req.userId, {
        $pull: {
          favourites: { lat, lon, name, country }
        },
      },
        { new: false }
      )
      res.status(200).json("Location Removed From Favourites")
    } else {
      await userModel.findByIdAndUpdate(req.userId, {
        $push: {
          favourites: { lat, lon, name, country }
        },
      },
        { new: false }
      )
      res.status(200).json("Location Added To Favourites")
    }
  } catch (err) {
    res.status(500).send("Interal Server Error");
  }
})

app.get("/favourites/get", authMiddleware, async (req, res) => {
  const userModel = require("./models/user.js");

  try {
    userModel.findById(req.userId).then(user => {
      if (user) {
        res.status(200).json(user.favourites);
      } else {
        res.status(404).json("No Existing Record")
      }
    })
  } catch (err) {
    res.status(500).json("Internal Server Error");
  }
})

app.post("/sdapi", async (req, res) => {
  const { weather } = req.body;

  try {
    const payload = {
      prompt: `It is beautiful ${weather} day or night`,
      output_format: "png"
    };

    const response = await axios.post(
      process.env.STABILITY_API_URL,
      axios.toFormData(payload, new FormData()),
      {
        headers: {
          authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
          accept: "application/json"
        }
      }
    );

    // Directly using the Base64 image from the response
    if (response.status === 200 && response.data && response.data.image) {
      res.json({ image: response.data.image });
    } else {
      // Handle error response if the image is not returned as expected
      throw new Error(`Failed to retrieve image: ${JSON.stringify(response.data)}`);
    }
  } catch (error) {
    console.error("Error generating image:", error);
    res.status(500).json({ error: "Error generating image" });
  }
});


const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Listening from port: ${port}`);
})