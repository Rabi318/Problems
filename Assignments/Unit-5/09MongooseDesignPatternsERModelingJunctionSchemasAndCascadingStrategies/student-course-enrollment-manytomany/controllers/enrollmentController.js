const { Course } = require("../models/courseModel");
const { Student } = require("../models/studentModel");

exports.enrollStudent = async (req, res) => {
  try {
    const { studentId, courseId } = req.body;

    const student = await Student.findOne({ _id: studentId, isActive: true });
    if (!student) return res.status(400).json({ msg: "Invalid student id" });

    const course = await Course.findOne({ _id: courseId, isActive: true });
    if (!course) return res.status(400).json({ msg: "Invalid course id" });

    const enrollment = await Enrollment.create({ studentId, courseId });

    res.status(201).json({ msg: "Enrolled", enrollment });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};
