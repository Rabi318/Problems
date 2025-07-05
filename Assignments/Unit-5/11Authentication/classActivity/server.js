const express = require("express");
const connectDB = require("./configs/db");
require("dotenv").config();
const PORT = 3000;
const app = express();
connectDB();

app.use(express.json());
app.get("/test", (req, res) => {
  res.send("Test route is working!");
});

app.use("/users", require("./routers/userRouter"));
app.use("/todos", require("./routers/todoRouter"));
app.use((req, res) => {
  res.status(404).send("Route not found");
});
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT} 😎😎`);
});
