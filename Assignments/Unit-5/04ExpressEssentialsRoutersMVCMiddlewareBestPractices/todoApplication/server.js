const express = require("express");
const todoRoutes = require("./routes/todoRoutes");

const app = express();

const PORT = 3000;

app.use(express.json());
app.use("/todos", todoRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(PORT, () => {
  console.log("Server listening on port 😎 ", PORT);
});
