const express = require("express");
const { verifyToken, checkRole } = require("../middlewares/authMiddleware");
const User = require("../models/userModel");

const router = express.Router();

router.get("/", verifyToken, checkRole(["admin"]), async (req, res) => {
  try {
    const users = await User.find().select("-password");
    if (!users.length) {
      return res.status(404).json({ msg: "No users found" });
    }
    res.status(200).json({ msg: "Users retrieved successfully", data: users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error retrieving users" });
  }
});

router.get("/profile", verifyToken, async (req, res) => {
  try {
    const { name, email, role } = req.user;
    res.status(200).json({
      msg: "User profile retrieved successfully",
      data: { name, email, role },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error retrieving user profile" });
  }
});

router.put("/profile", verifyToken, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name: req.body.name, email: req.body.email },
      { new: true, runValidators: true }
    );
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.status(200).json({ msg: "Profile updated successfully", data: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error updating profile" });
  }
});

module.exports = router;
