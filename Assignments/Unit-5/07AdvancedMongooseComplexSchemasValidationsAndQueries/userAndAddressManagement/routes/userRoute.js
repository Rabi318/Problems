const express = require("express");
const User = require("../models/userModel");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ msg: "User created", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
});

router.post("/add-address/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      res.status(404).json({ msg: "User Not Found!" });
    }
    user.address.push(req.body);
    await user.save();
    res.status(201).json({ msg: "Address added", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
});

router.get("/summary", async (req, res) => {
  try {
    const users = await User.find();
    const totalUsers = users.length;
    const totalAddresses = users.reduce(
      (sum, user) => sum + user.address.length,
      0
    );

    const userSummaries = users.map((u) => ({
      name: u.name,
      addressCount: u.address.length,
    }));
    res.status(200).json({ totalUsers, totalAddresses, users: userSummaries });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
});
router.get("/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id/address/:addressId", async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.address.id(addressId)?.remove();
    await user.save();
    res.status(200).json({ msg: "Address deleted", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
});

module.exports = router;
