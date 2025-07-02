const { Enrollment } = require("../models/enrollmentModel");
const { Student } = require("../models/studentModel");

exports.createStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json({ msg: "Student created", student });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );
    await Enrollment.updateMany(
      { studentId: req.params.id },
      { $set: { isActive: false } }
    );
    res.status(200).json({ msg: "Student deleted", student });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

exports.getStudentCourse = async (req, res) => {
  try {
    const { studentId } = req.params;
    const courses = await Enrollment.find(studentId).populate("courseId");
    res.status(200).json({ msg: "Enrolled", courses });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};
