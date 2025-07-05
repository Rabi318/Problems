const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config();

const app = express();

app.use(express.json());
connectDB();

app.get("/test", (req, res) => {
  res.send("Test route is working!");
});

app.use("/auth", require("./routes/authRoutes"));
app.use("/subscription", require("./routes/subscriptionRoutes"));
app.use("/content", require("./routes/contentRoutes"));

app.use((req, res) => {
  res.status(404).send("Route not found");
});
app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT} 😎😎`);
});
