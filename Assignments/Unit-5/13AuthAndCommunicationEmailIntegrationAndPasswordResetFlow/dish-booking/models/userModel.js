const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  resetToken: String,
  resetTokenExpiry: Date,
  role: { type: String, enum: ["admin", "user", "chef"], default: "user" },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
