const express = require("express");
const dotenv = require("dotenv");
const { connectDB } = require("./configs/db");

const app = express();
dotenv.config();
app.use(express.json());
connectDB();

app.use("/students", require("./routes/studentRoutes"));
app.use("/courses", require("./routes/courseRoutes"));
app.use("/enroll", require("./routes/enrollmentRoutes"));

app.use((req, res) => {
  res.status(404).send("Route not found");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT} 😎😎`);
});
