const express = require("express");
const app = express();
const PORT = 3000;

app.get("/home", (req, res) => {
  res.status(200).send("<h1>Welcome to Home Page</h1>");
});
app.get("/aboutus", (req, res) => {
  res.status(200).json({ message: "Welcome to About Us" });
});
app.get("/contactus", (req, res) => {
  res.status(200).json({
    name: "Masai School",
    email: "contact@masai.com",
    phone: "123-456-7890",
  });
});
app.use((req, res, next) => {
  res.status(404).send("Sorry, route not found");
});
app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
