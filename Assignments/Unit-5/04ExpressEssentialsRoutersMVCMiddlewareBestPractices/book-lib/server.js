const express = require("express");
const logger = require("./middlewares/loggerMiddleware");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(logger);

app.use("/admin", require("./routes/adminRoutes"));
app.use("/reader", require("./routes/readerRouter"));

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(PORT, () => {
  console.log("Server listening on port 😎 ", PORT);
});
