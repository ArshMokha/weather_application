const mongoose = require ("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  favourites: [
    {
      lat: Number,
      lon: Number,
      name: String,
      country: String,
    }
  ]
})

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;