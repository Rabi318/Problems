const User = require("../models/User");
const Book = require("../models/Book");

exports.addUser = async (req, res) => {
  const { name, email } = req.body;
  if (!name || !email)
    return res.status(400).json({ msg: "Name and email required" });

  try {
    const user = new User({ name, email });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserRentals = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate("rentedBooks");
    if (!user) return res.status(404).json({ msg: "User not found" });
    res.json(user.rentedBooks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
