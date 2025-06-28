const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/masai_backend");
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Connection error:", error.message);
  }
};

module.exports = connectDB;
