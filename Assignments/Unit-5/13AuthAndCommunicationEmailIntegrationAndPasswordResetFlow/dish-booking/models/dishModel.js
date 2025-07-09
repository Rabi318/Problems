const mongoose = require("mongoose");

const dishSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
});

const Dish = mongoose.model("Dish", dishSchema);
module.exports = Dish;
