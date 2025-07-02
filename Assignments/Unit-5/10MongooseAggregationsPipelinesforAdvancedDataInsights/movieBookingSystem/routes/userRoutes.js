const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/users", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(200).send({ message: "User registered successfully", user });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

module.exports = router;
