const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRouter = require("./routes/userRoutes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
dotenv.config();

const PORT = process.env.PORT;

connectDB();

app.get("/test", (req, res) => {
  res.send("Test route is working!");
});
app.use("/api/users", userRouter);

app.use((req, res) => {
  res.status(404).send("Route not found");
});
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT} 😎😎`);
});
