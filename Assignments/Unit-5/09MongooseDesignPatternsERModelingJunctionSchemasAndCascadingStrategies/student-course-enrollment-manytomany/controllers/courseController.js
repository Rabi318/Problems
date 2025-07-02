const { Course } = require("../models/courseModel");
const { Enrollment } = require("../models/enrollmentModel");

exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json({ msg: "Course created", course });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );
    await Enrollment.updateMany(
      { courseId: req.params.id },
      { $set: { isActive: false } }
    );
    res.status(200).json({ msg: "Course deleted", course });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

exports.getCourseStudents = async (req, res) => {
  try {
    const students = await Enrollment.find({
      courseId: req.params.id,
      isActive: true,
    })
      .populate({ path: "studentId", match: { isActive: true } })
      .select("studentId");

    res.json(students.map((e) => e.studentId).filter((s) => s));
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};
