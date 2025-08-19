import express from "express";
import cors from "cors";
import connectDB from "./config/db";
import taskRoutes from "./routes/taskRoutes";

const app = express();
app.use(cors());
connectDB();
app.use(express.json());
app.use("/api", taskRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 5000");
});
