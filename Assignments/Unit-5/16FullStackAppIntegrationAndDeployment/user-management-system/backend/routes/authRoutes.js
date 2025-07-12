const express = require("express");
const User = require("../models/userModel");

const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const user = new User({ name, email, password, role });
    await user.save();
    res.status(201).json({ msg: "User registered successfully", data: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error registering user" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRY,
    });
    res.status(200).json({ msg: "Login successful", token, data: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error logging in" });
  }
});

module.exports = router;
