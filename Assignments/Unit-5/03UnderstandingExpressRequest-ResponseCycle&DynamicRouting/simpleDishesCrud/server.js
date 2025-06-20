const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;
const dbPath = path.join(__dirname, "db.json");
app.use(express.json());

//Helper functions
const readData = () => {
  const data = fs.readFileSync(dbPath, "utf-8");
  return JSON.parse(data);
};
const writeData = (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

app.get("/test", (req, res) => {
  res.json({ msg: "This is a test route" });
});

app.post("/dishes", (req, res) => {
  const { name, price, category } = req.body;
  if (!name || !price || !category) {
    return res.status(400).json({ msg: "Missing required fields" });
  }
  const data = readData();
  const newId = data.dishes.length
    ? data.dishes[data.dishes.length - 1].id + 1
    : 1;
  const newDish = { id: newId, name, price, category };
  data.dishes.push(newDish);
  writeData(data);
  res.status(201).json({ msg: "Dish added successfully", dish: newDish });
});

app.get("/dishes", (req, res) => {
  const data = readData();
  res.json({ msg: "List of dishes", dishes: data.dishes });
});
//get dishes by name
app.get("/dishes/get", (req, res) => {
  console.log("GET /dishes/get hit");
  const name = req.query.name;
  if (!name)
    return res
      .status(400)
      .json({ msg: "Please provide a dish name as a query parameter." });
  const data = readData();
  console.log(name);
  const matches = data.dishes.filter((dish) =>
    dish.name.toLowerCase().includes(name)
  );
  if (matches.length === 0) {
    res.status(404).json({ message: "No dishes found" });
  } else {
    res.json(matches);
  }
});
//get dishes by id
app.get("/dishes/:id", (req, res) => {
  const id = Number(req.params.id);
  const data = readData();
  const dish = data.dishes.find((d) => d.id === id);
  if (!dish) {
    return res.status(404).json({ msg: "Dish not found" });
  }
  res.json({ msg: "Dish details", dish });
});

//update dish by id
app.put("/dishes/:id", (req, res) => {
  const id = Number(req.params.id);
  const updatedDish = req.body;
  const data = readData();
  const index = data.dishes.findIndex((d) => d.id === id);
  if (index === -1) {
    return res.status(404), json({ msg: "Dish not found" });
  }
  data.dishes[index] = { ...data.dishes[index], ...updatedDish };
  writeData(data);
  res.json({ msg: "Dish updated successfully", dish: data.dishes[index] });
});

//delete dish by id
app.delete("/dishes/:id", (req, res) => {
  const id = Number(req.params.id);
  const data = readData();
  const index = data.dishes.findIndex((d) => d.id === id);
  if (index === -1) {
    return res.status(404).json({ msg: "Dish not found" });
  }
  data.dishes.splice(index, 1);
  writeData(data);
  res.json({ msg: "Dish deleted successfully" });
});

app.use((req, res) => {
  res.status(404).json({ msg: "Route not found" });
});
app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
