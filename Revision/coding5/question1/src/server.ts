import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import studentRoutes from "./routes/studentRoutes";

dotenv.config();
const app = express();
app.use(express.json());
connectDB();

app.get("/test", (req, res) => {
  res.send("Hello World");
});
app.use("/students", studentRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});
