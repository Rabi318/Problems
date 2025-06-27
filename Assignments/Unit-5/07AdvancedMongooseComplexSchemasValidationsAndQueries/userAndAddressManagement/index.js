const express = require("express");
const connectDB = require("./config/db");

const app = express();
const PORT = 3000;

connectDB();
app.use(express.json());

app.get("/test", (req, res) => {
  res.send("Test route is working!");
});

app.use("/user", require("./routes/userRoute"));
app.use((req, res) => {
  res.status(404).send("Route not found");
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT} 😎😎`);
});
