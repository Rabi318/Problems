const express = require("express");
const app = express();
const PORT = 3000;

app.get("/home", (req, res) => {
  res.send("This is Home Page");
});

app.get("/contactus", (req, res) => {
  res.send("Contact us at contact@contact.com");
});

app.get("/about", (req, res) => {
  res.send("Welcome to the About page!");
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT} 😎😎`);
});
