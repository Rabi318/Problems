const express = require("express");
const connectDB = require("./config/db");

const app = express();
const PORT = 3000;

connectDB();
app.use(express.json());

app.use("/api/vehicles", vehicleRoutes);

// Not Found Handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Central error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT} 😎😎`);
});
