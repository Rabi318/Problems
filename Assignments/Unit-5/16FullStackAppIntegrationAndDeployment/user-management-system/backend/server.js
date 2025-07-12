const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const resourceRoutes = require("./routes/resourceRoutes");
require("dotenv").config();

const app = express();
app.use(cors());
connectDB();
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/resources", resourceRoutes);
app.use((req, res) => {
  res.status(404).send("Not Found");
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
