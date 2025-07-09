const express = require("express");
const Todo = require("../models/todoModel");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/add", authMiddleware(["user", "admin"]), async (req, res) => {
  try {
    let todo = await Todo.create({ ...req.body, user: req.user.userId });
    res.status(201).json({ msg: "Todo created", todo });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error", error });
  }
});

router.get("/my-todos", async (req, res) => {
  try {
    //check data is present in redis first
    //if yes send the response from redis
    //elese send the response from db, and store in redis

    const todos = await Todo.find({ user: req.user });
    res.status(200).json({ msg: "All todos", todos });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error", error });
  }
});

module.exports = router;
