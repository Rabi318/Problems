const express = require("express");
const UserModel = require("../models/userModel");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let data = await UserModel.find();
    res.status(200).json({ msg: "All users", data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error", error });
  }
});

router.post("/", async (req, res) => {
  try {
    let data = await UserModel.create(req.body);
    res.status(201).json({ msg: "User created", data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error", error });
  }
});
module.exports = router;
