const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db");

const app = express();
app.use(express.json());
connectDB();

app.get("/test", (req, res) => {
  res.json({ msg: "Successfully running" });
});

app.use("/books", require("./routes/bookRoutes"));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
