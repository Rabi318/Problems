const mogoose = require("mongoose");

const connectDB = async () => {
  try {
    await mogoose.connect(process.env.MONGO_URL);
    console.log("Connected to DB 🚀🚀");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
