const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { hanldeAsync } = require("../utils/handleAsync");

const generateTokens = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES || "1h",
  });
};

const signup = hanldeAsync(async (req, res) => {
  const { name, email, password, role } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(409).json({ msg: "User already exists" });
  const user = await User.create({ name, email, password, role });
  const token = generateTokens(user);
  res.status(201).json({
    message: "User registered successfully",
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
    token,
  });
});

const login = hanldeAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).josn({ msg: "Invaid email" });
  const isMatch = await user.comparePassword(password);
  if (!isMatch) return res.status(401).json({ msg: "Invalid Password" });
  const token = generateTokens(user);
  res.json({
    message: "Login successful",
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
    token,
  });
});

const me = hanldeAsync(async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.josn({ user });
});

module.exports = { signup, login, me };
