const User = require("../models/userMode");
const jwt = require("jsonwebtoken");
const { compareData, hashData } = require("../utils/hash");

const signup = async (req, res) => {
  try {
    const { name, email, password, secretQuestion, secretAnswer } = req.body;
    if (!name || !email || !password || !secretQuestion || !secretAnswer) {
      return res.status(400).json({ msg: "All fields are required" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ msg: "User already exists" });
    const hashedPassword = await hashData(password);
    const hashedAnswer = await hashData(secretAnswer);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      secretQuestion,
      secretAnswer: hashedAnswer,
    });
    await newUser.save();
    res.status(201).json({ msg: "User created successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Server Error", error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid email" });
    const isMatch = await compareData(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid Password" });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.json({ msg: "Login Success", user, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { name } = req.body;
    const user = await User.findById(req.ures.id);
    if (!user) return res.status(400).json({ msg: "User not found" });
    user.name = name || user.name;
    await user.save();
    res.json({ msg: "Profile updated", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, secretAnswer, newPassword } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });
    const isAnswerCorrect = await compareData(secretAnswer, user.secretAnswer);
    if (!isAnswerCorrect) {
      return res.status(400).json({ msg: "Invalid Answer" });
    }
    user.password = await hashData(newPassword);
    await user.save();
    res.json({ msg: "Password updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

module.exports = { signup, login, updateProfile, resetPassword };
