const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to DB 🚀🚀");
  } catch (error) {
    console.log("Error connectiong to database", error.message);
  }
};

module.exports = connectDB;
