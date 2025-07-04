const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/masai_backend");
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB error", err);
    process.exit(1);
  }
};

module.exports = connectDB;
