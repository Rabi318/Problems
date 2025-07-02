const express = require("express");
const { Student } = require("../models/studentModel");
const { Course } = require("../models/courseModel");
const { Enrollment } = require("../models/enrollmentModel");

const router = express.Router();

//add student
router.post("/add-student", async (req, res) => {
  try {
    let student = await Student.create(req.body);
    res.status(201).json({ msg: "Student created", student });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
});

//add course
router.post("/add-course", async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json({ msg: "Course added", course });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
});

//junction model

router.post("/enroll", async (req, res) => {
  try {
    let enroll = await Enrollment.create(req.body);
    res.status(201).json({ msg: "Enrolled", enroll });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
});

//get enrollment
router.get("/enroll", async (req, res) => {
  try {
    const enroll = await Enrollment.find(req.params)
      .populate("studentId")
      .populate("courseId");
    res.status(201).json({ msg: "Enrolled", enroll });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
});

//get student details using course id
router.get("/student/:courseId", async (req, res) => {
  try {
    const { courseId } = req.params;
    const student = await Enrollment.findById(
      { courseId },
      { courseId: 0, _id: 0 }
    ).populate("studentId");
    res.status(201).json({ msg: "Enrolled", student });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
});

//delete course : soft delete
router.delete("/delete-course/:courseId", async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId);
    course.isDeleted = true;
    // let enrollments = await Enrollment.updateMany(
    //   { courseId },
    //   { $set: { isActive: false } }
    // );
    await course.save();
    res.status(201).json({ msg: "Course deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
});
module.exports = router;
