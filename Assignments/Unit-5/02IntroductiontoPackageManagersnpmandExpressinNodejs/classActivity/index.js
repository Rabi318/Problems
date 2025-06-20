var isEven = require("is-even");

const express = require("express");
const app = express();

const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Hello World from the server");
});
app.get("/test", (req, res) => {
  res.json({
    message: "Hello World from the server test route",
  });
});
app.get("/contact", (req, res) => {
  res.json({
    message: "Hello World from the server contact route",
  });
});
app.listen(PORT, () => {
  console.log("Server listening on port 😎 ", PORT);
});
