import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("Database is connected");
  } catch (error) {
    console.log("Error connecting to database");
    process.exit(1);
  }
};

export default connectDB;
