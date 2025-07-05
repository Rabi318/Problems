const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema({
  title: String,
  type: { type: String, enum: ["free", "premium"] },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Content", contentSchema);
