const express = require("express");
const connectDB = require("./configs/db");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

const app = express();

app.use(express.json());
connectDB();

app.get("/test", (req, res) => {
  res.send("Test route is working!");
});

app.use("/auth", authRoutes);
app.use("/bookings", bookingRoutes);

app.use((req, res) => {
  res.status(404).send("Route not found");
});
app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT} 😎😎`);
});
