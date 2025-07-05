const express = require("express");
const connectDB = require("./configs/db");
const authMiddleware = require("./middlewares/authMiddleware");
require("dotenv").config();

const app = express();
app.use(express.json());
connectDB();

app.use("/auth", require("./routers/authRouter"));

//protected route
app.get("/protected", authMiddleware, (req, res) => {
  res.status(200).json({
    msg: "Welcome to protected route",
    user: req.user,
  });
});

app.use((req, res) => {
  res.status(404).send("Route not found");
});
app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT} 😎😎`);
});
