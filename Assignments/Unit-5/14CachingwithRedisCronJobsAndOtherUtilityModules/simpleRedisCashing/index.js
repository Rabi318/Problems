const express = require("express");
const { createClient } = require("redis");
require("dotenv").config();
const app = express();
app.use(express.json());

//Redis client
const redisClient = createClient();
redisClient.connect().catch(console.error);

let items = [
  { id: 1, name: "Item One" },
  { id: 2, name: "Item Two" },
];

const REDIS_KEY = "items:all";
app.get("/items", async (req, res) => {
  try {
    const cahedData = await redisClient.get(REDIS_KEY);
    if (cahedData) {
      console.log("Cache HIT");
      res.json(JSON.parse(cahedData));
    }
    console.log("Cache MISS");
    await redisClient.setEx(REDIS_KEY, 60, JSON.stringify(items));
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/items", async (req, res) => {
  const { name } = req.body;
  const newItem = { id: Date.now(), name };
  items.push(newItem);

  await redisClient.del(REDIS_KEY);
  console.log("Cache invalidated after POST");
  res.status(201).json(newItem);
});

app.put("/items/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;
  const index = items.findIndex((item) => item.id === id);

  if (index === -1) return res.status(404).json({ message: "Item not found" });

  items[index].name = name;
  await redisClient.del(REDIS_KEY);
  console.log(" Cache invalidated after PUT");
  res.json(items[index]);
});

app.delete("/items/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const index = items.findIndex((item) => item.id === id);

  if (index === -1) return res.status(404).json({ message: "Item not found" });

  const deletedItem = items.splice(index, 1);
  await redisClient.del(REDIS_KEY);
  console.log("Cache invalidated after DELETE");
  res.json(deletedItem[0]);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
