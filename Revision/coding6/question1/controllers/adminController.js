const { hanldeAsync } = require("../utils/handleAsync");

const User = require("../models/userModel");

const listUsers = hanldeAsync(async (req, res) => {
  const usres = await User.find().select("-password");
  res.json({ count: usres.length, users: usres });
});

module.exports = { listUsers };
