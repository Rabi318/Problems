const express = require("express");
const authMiddleware = require("./middlewares/authMiddleware");
const connectDB = require("./configs/db");
require("dotenv").config();

const app = express();

app.use(express.json());
connectDB();

app.use("/auth", require("./routers/authRouter"));
app.use("/notes", require("./routers/noteRouter"));

app.use((req, res) => {
  res.status(404).send("Route not found");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT} 😎😎`);
});
