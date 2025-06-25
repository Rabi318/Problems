const express = require("express");
const limiter = require("./middlewares/rateLimiter");

const app = express();
const PORT = 3000;

app.get("/test", (req, res) => {
  res.send("This is a test route");
});

app.get("/demo", limiter, (req, res) => {
  res.json({ data: "This is a test route 2" });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT} 😎😎`);
});
