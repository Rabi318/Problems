const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
});

const Student = mongoose.model("student", studentSchema);
module.exports = { Student };
