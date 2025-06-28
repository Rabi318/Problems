const express = require("express");
const connectDB = require("./config/db");
const app = express();
const PORT = 3000;

app.use(express.json());

connectDB();

app.use("/user", require("./routes/userRoutes"));
app.use("/profile", require("./routes/profileRoutes"));

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT} 😎😎`);
});
