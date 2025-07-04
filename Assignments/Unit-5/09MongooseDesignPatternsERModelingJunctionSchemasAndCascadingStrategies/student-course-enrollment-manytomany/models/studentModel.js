const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  isActive: { type: Boolean, default: true },
});

const Student = mongoose.model("student", studentSchema);
module.exports = { Student };
