const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connectDB = require("./config/db");
const app = express();

app.use(cors());
app.use(express.json());
connectDB();

app.get("/test", (req, res) => {
  res.send("hello world");
});

app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/users", require("./routes/userRoute"));
app.use("/api/notes", require("./routes/noteRoute"));

app.use((req, res) => {
  res.status(404).send("Route not found");
});

app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}`);
});
