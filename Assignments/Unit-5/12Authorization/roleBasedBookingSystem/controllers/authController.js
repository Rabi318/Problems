const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { generateTokens } = require("../utils/tokenUtils");

const signup = async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      role,
    });
    res.status(201).json({ msg: "User created", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ msg: "Invalid Password" });
    const payload = { userId: user._id, role: user.role };
    const { accessToken, refreshToken } = generateTokens(payload);
    user.refreshToken = refreshToken;
    await user.save();
    res.json({ msg: "Login Success", user, accessToken, refreshToken });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const refresh = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken)
    return res.status(401).jso({ msg: "Missing refresh token" });

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({ msg: "Invalid refresh Token" });
    }

    const tokens = generateTokens({ userId: user._id, role: user.role });
    user.refreshToken = tokens.refreshToken;
    await user.save();
    res.json(tokens);
  } catch (error) {
    res.status(403).json({ msg: "Invalid refresh Token" });
  }
};

module.exports = { signup, login, refresh };
