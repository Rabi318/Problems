const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/test", (req, res) => {
  res.send("This is a test route");
});
app.get("/demo", (req, res) => {
  res.json({ data: "This is a test route 2" });
});

app.post("/add-data", (req, res) => {
  console.log(req.body);
  res.status(201).send("Data added successfully");
});

app.put("/update-data", (req, res) => {
  res.send("Data updated");
});

app.delete("/dle-data", (req, res) => {
  res.send("Data deleted");
});
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT} 😎😎`);
});
