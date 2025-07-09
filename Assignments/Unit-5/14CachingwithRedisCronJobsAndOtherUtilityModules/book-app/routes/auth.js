const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { users } = require("../db/data");

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  if (users.find((u) => u.username === username))
    return res.status(400).json({ message: "User exists" });

  const hash = await bcrypt.hash(password, 10);
  const user = { id: Date.now().toString(), username, passwordHash: hash };
  users.push(user);
  res.status(201).json({ message: "User created" });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);
  if (!user || !(await bcrypt.compare(password, user.passwordHash)))
    return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET
  );
  res.json({ token });
});

module.exports = router;
