const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  isActive: Boolean,
});

const Enrollment = mongoose.model("Enrollment", enrollmentSchema);
module.exports = { Enrollment };
