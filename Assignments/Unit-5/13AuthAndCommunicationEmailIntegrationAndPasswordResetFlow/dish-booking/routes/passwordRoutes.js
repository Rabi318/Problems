const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const User = require("../models/userModel");
const sendEmail = require("../utils/sendEmail");
const router = express.Router();

router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const token = uuidv4();
    const user = await User.findOne({ email });
    if (user) {
      user.resetToken = token;
      user.resetTokenExpiry = Date.now() + 15 * 60 * 1000;
      await user.save();
      const link = `${process.env.CLIENT_URL}/reset-password?token=${token}`;
      await sendEmail(email, "Password Reset Request", link);
    }
    res.json({ msg: "If this email exists, a reset link has been sent." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something went wrong" });
  }
});

router.post("/reset-password/:token", async (req, res) => {
  const user = await User.findOne({
    resetToken: req.params.token,
    resetTokenExpiry: { $gt: Date.now() },
  });
  if (!user) return res.status(400).json({ msg: "Invalid or expired token" });
  user.password = await bcrypt.hash(req.body.password, 10);
  user.resetToken = undefined;
  user.resetTokenExpiry = undefined;
  await user.save();
  res.json({ msg: "Password reset successfully" });
});

module.exports = router;
