const express = require("express");
const getFileInfo = require("./fileinfo");
const parseUrl = require("./urlparser");

const app = express();
const PORT = 3000;

app.get("/test", (req, res) => {
  res.send("Test route is working!");
});

// /fileinfo route
app.get("/fileinfo", (req, res) => {
  const filePath = req.query.filepath;
  const result = getFileInfo(filePath);
  res.json(result);
});

// /parseurl route
app.get("/parseurl", (req, res) => {
  const inputUrl = req.query.url;
  const result = parseUrl(inputUrl);
  res.json(result);
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT} 😎😎`);
});
