import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/masai_backend");
    console.log("MongodDb connected");
  } catch (error) {
    console.log("MongodDb not connected");
    process.exit(1);
  }
};
export default connectDB;
