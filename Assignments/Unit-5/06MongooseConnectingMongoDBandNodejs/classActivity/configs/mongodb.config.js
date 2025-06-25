//create a function which connects to the database
const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/masai_backend");
    console.log("Connected to DB 🚀🚀");
  } catch (error) {
    console.log("Error connecting to database");
  }
};

module.exports = connectDB;
