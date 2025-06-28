const express = require("express");
const router = express.Router();

const Profile = require("../models/profileModel");
const User = require("../models/userModel");

router.post("/", async (req, res) => {
  const { bio, socialMediaLinks, user } = req.body;
  if (!user) return res.status(400).json({ msg: "User is required" });

  try {
    const existringUser = await User.findById(user);
    if (!existringUser) {
      return res.status(404).json({ msg: "User doesn't exist" });
    }
    const existringProfile = await Profile.findOne({ user });
    if (existringProfile) {
      return res.status(400).json({ msg: "Profile already exists" });
    }
    const profile = await Profile.create({ bio, socialMediaLinks, user });
    if (profile) {
      return res.status(201).json({ msg: "Profile created", profile });
    }
  } catch (error) {
    res.status(500).json({ msg: "Error creating profile", error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", "name email");
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ msg: "Error creating profile", error: err.message });
  }
});

module.exports = router;
