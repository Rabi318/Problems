const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Todo = require("../models/todoModel");

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        res.status(500).json({ msg: "Internal Server Error" });
      } else {
        // console.log(password, hash)
        //store this pass in to db along with other data
        const user = await User.create({ username, email, password: hash });
        res.status(201).json({ msg: "User Created", user });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User Not Found" });
    } else {
      bcrypt.compare(password, user.password, async (err, result) => {
        if (result) {
          const { username, email, _id } = user;
          //generate jwt token
          const token = jwt.sign({ userId: _id }, process.env.SECRET_KEY, {
            expiresIn: "1d",
          });

          res.status(200).json({
            msg: "Login Success",
            user: { username, email },
            token,
          });
        } else {
          res.status(401).json({ msg: "Invalid Password" });
        }
      });
    }
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

module.exports = router;
