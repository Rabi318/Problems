const express = require("express");
const { connectDB } = require("./configs/db");

const app = express();
const PORT = 3000;

app.use(express.json());

connectDB();

app.use("/lms", require("./routes/lmsRoute"));
app.use((req, res) => {
  res.status(404).send("Route not found");
});

app.listen(() => {
  console.log(`Server is listening on port ${PORT} 😎😎`);
});
