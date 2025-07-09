const express = require("express");
const auth = require("../middleware/auth");
const redis = require("../utils/redisClient");
const { books } = require("../db/data");

const router = express.Router();
router.use(auth);

// Helper for Redis key
const userBooksKey = (userId) => `books:${userId}`;
const bulkKey = (userId) => `bulkBooks:${userId}`;

// GET /books (with caching)
router.get("/", async (req, res) => {
  const key = userBooksKey(req.user.id);
  const cached = await redis.get(key);

  if (cached) {
    console.log("✅ Cache HIT");
    return res.json(JSON.parse(cached));
  }

  console.log("❌ Cache MISS");
  const userBooks = books.filter((b) => b.userId === req.user.id);
  await redis.setEx(key, 60, JSON.stringify(userBooks));
  res.json(userBooks);
});

// POST /books
router.post("/", async (req, res) => {
  const { title, author } = req.body;
  const book = {
    id: Date.now().toString(),
    title,
    author,
    userId: req.user.id,
  };
  books.push(book);
  await redis.del(userBooksKey(req.user.id));
  console.log("🗑️ Cache invalidated on POST");
  res.status(201).json(book);
});

// PUT /books/:id
router.put("/:id", async (req, res) => {
  const book = books.find(
    (b) => b.id === req.params.id && b.userId === req.user.id
  );
  if (!book) return res.sendStatus(404);
  Object.assign(book, req.body);
  await redis.del(userBooksKey(req.user.id));
  console.log("🗑️ Cache invalidated on PUT");
  res.json(book);
});

// DELETE /books/:id
router.delete("/:id", async (req, res) => {
  const index = books.findIndex(
    (b) => b.id === req.params.id && b.userId === req.user.id
  );
  if (index === -1) return res.sendStatus(404);
  books.splice(index, 1);
  await redis.del(userBooksKey(req.user.id));
  console.log("🗑️ Cache invalidated on DELETE");
  res.json({ message: "Deleted" });
});

// POST /books/bulk
router.post("/bulk", async (req, res) => {
  const key = bulkKey(req.user.id);
  const booksToQueue = req.body.books || [];
  const current = await redis.get(key);
  const existing = current ? JSON.parse(current) : [];
  const merged = [...existing, ...booksToQueue];

  await redis.set(key, JSON.stringify(merged));
  res.json({ message: "Books will be added later." });
});

module.exports = router;
