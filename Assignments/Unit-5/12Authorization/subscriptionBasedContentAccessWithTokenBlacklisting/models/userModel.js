const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["user", "admin"], default: "user" },
  subscription: {
    plan: { type: String, enum: ["free", "premium", "pro"], default: "free" },
    expiresAt: { type: Date },
  },
});

module.exports = mongoose.model("User", userSchema);
