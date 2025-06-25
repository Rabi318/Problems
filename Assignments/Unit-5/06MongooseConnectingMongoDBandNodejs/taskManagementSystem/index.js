const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/dbConnect");

dotenv.config();
const app = express();
app.use(express.json());

connectDB();

app.get("/test", (req, res) => {
  res.send("Test route is working!");
});
app.use("/tasks", require("./routes/taskRouter"));
app.use((req, res) => {
  res.status(404).send("Route not found");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT} 😎😎`);
});
