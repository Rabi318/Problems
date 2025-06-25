const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
const app = express();
app.use(express.json());

connectDB();
app.use("/library", require("./routes/libraryRouter"));

app.use((req, res) => {
  res.status(404).send("Route not found");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT} 😎😎`);
});
