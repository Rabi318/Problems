const express = require("express");
const connectDB = require("./config/db");

const app = express();
const PORT = 3000;

connectDB();

app.use(express.json());

app.use("/", require("./routes/memberRoutes"));
app.use("/", require("./routes/bookRoutes"));

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
