const express = require ("express");
const axios = require ("axios");
const mongoose = require ("mongoose");
const cors = require ("cors");
require('dotenv').config();

const app = express();
const corsOptions = {
  origin: "http://localhost:5173"
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

app.post("/register", (req, res) => {
  const userModel = require ("./models/user.js");
  userModel.create(req.body)
  .then(user => {
    res.json(user)
  })
  .catch(err => {
    res.json(err)
  })
})

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
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

app.post("/login", (req, res) => {
  const userModel = require ("./models/user.js");
  const { email, password } = req.body;

  userModel.findOne({email: email}).then((user) => {
    console.log(user)
    if (user) {
      if (user.password === password) {
        const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET, {expiresIn: "3h"})
        res.json({message: "Success", token});
      } else {
        res.status(401).json({message: "Incorrect Password"});
      }
    } else {
      res.status(404).json({message: "No Existing Record"});
    }
  }).catch((err) => {
    res.status(500).json({message: "Internal Server Error"});
  })
})

app.post("/favourite", authMiddleware, (req, res) => {
  const userModel = require("./models/user.js");
  const { location } = req.body;

})

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Listening from port: ${port}`);
})