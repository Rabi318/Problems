const express = require("express");
const connectDB = require("./configs/db");
require("dotenv").config();

const app = express();

connectDB();
app.use(express.json());

app.get("/test", (req, res) => {
  res.send("Test route is working!");
});
app.get("/login", (req, res) => {
  res.send("Please Login again");
});

app.use("/login", require("./routes/authRoutes"));

app.use((req, res) => {
  res.status(404).send("Route not found");
});
app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT} 😎😎`);
});
