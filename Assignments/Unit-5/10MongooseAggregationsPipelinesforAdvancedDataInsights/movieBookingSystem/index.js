const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./configs/db");
const movieRoutes = require("./routes/movieRoutes");
const userRoutes = require("./routes/userRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");

const app = express();
app.use(express.json());
dotenv.config();
connectDB();

app.use(movieRoutes);
app.use(userRoutes);
app.use(bookingRoutes);
app.use(analyticsRoutes);
app.use((req, res) => {
  res.status(404).send("Route not found");
});
app.listen(process.env.PORT, () => {
  console.log("Server is listening on port 3000");
});
