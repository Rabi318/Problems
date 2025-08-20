const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
const app = express();

connectDB();

app.use(express.json());

app.get("/test", (req, res) => {
  res.send("Test route is working!");
});

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api", require("./routes/protectedRoutes"));

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API not found",
  });
});
app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT} 😎😎`);
});
