const express = require("express");
const router = express.Router();

const User = require("../models/userModel");

router.post("/", async (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ msg: "Name and email are required" });
  }
  try {
    const user = new User({ name, email });
    await user.save();
    res.status(201).json({ msg: "User created", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something went wrong" });
  }
});

module.exports = router;
