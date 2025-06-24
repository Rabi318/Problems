const express = require("express");
const bodyParser = require("body-parser");
const employeeRoutes = require("./routes/employeeRoutes");
const logger = require("./middlewares/loggerMiddleware");

const app = express();
const PORT = 4000;

app.use(bodyParser.json());
app.use(logger);

app.use("/employees", employeeRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
