const express = require("express");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const connectDB = require("./config/db");

const app = express();
connectDB();

app.use(express.json());
app.use("/", authRoutes);

app.use((req, res) => {
  res.status(404).send("Route not found");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT} 😎😎`);
});
