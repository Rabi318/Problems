const jwt = require("jsonwebtoken");
const Blacklist = require("../models/blacklistModel");

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token)
    return res.status(401).json({ msg: "Unauthorized:Token Missing" });

  const blacklisted = await Blacklist.findOne({ token });
  if (blacklisted) return res.status(403).json({ msg: "Token blacklisted" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ msg: "Unauthorized:Invalid Token" });
  }
};

module.exports = authMiddleware;
