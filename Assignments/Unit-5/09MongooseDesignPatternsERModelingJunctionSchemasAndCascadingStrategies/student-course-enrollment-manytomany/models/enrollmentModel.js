const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  enrolledAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true },
});

const Enrollment = mongoose.model("Enrollment", enrollmentSchema);
module.exports = { Enrollment };
