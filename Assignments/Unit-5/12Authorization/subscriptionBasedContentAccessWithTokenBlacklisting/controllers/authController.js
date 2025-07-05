const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");
const Blacklist = require("../models/blacklistModel");

const { generateTokens } = require("../utils/tokenUtils");

const signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashed });
    res.status(201).json({ msg: "User created", user });
  } catch (error) {
    res.status(400).json({ msg: "signup failed" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid Password" });
    }

    //auto downgrade if expired
    if (user.subscription?.expiresAt < new Date()) {
      user.subscription.plan = "free";
      user.subscription.expiresAt = null;
      await user.save();
    }

    const payload = {
      userId: user._id,
      role: user.role,
      plan: user.subscription.plan,
    };
    const tokens = generateTokens(payload);

    res
      .status(200)
      .json({
        msg: "Login Success",
        user,
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      });
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const logout = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  const refreshToken = req.body.refreshToken;
  try {
    const accessExp = jwt.decode(token).exp * 1000;
    const refreshExp = jwt.decode(refreshToken).exp * 1000;

    await Blacklist.create({ token, expiresAt: new Date(accessExp) });
    await Blacklist.create({
      token: refreshToken,
      expiresAt: new Date(refreshExp),
    });

    res.json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(400).json({ error: "Logout failed" });
  }
};

const refresh = async (req, res) => {
  const { refreshToken } = req.body;
  try {
    const blacklisted = await Blacklist.findOne({ token: refreshToken });
    if (blacklisted)
      return res.status(403).json({ error: "Token blacklisted" });

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
    const user = await User.findById(decoded.userId);

    const payload = {
      userId: user._id,
      role: user.role,
      plan: user.subscription.plan,
    };
    const tokens = generateTokens(payload);

    res.json(tokens);
  } catch {
    res.status(403).json({ error: "Invalid refresh token" });
  }
};

module.exports = { signup, login, logout, refresh };
