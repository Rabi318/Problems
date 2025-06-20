const { getAllCourses, addCourse } = require("../models/course.model");

const fetchAllCourses = (req, res) => {
  try {
    const courses = getAllCourses();
    res.status(200).json({ msg: "List of courses", courses });
  } catch (err) {
    res.status(500).json({ msg: "Failed to get courses", error: err.message });
  }
};
const createCourse = (req, res) => {
  try {
    const newCourse = req.body;

    if (!newCourse.title || !newCourse.instructor || !newCourse.duration) {
      return res.status(400).json({ msg: "Missing required fields" });
    }

    const courses = getAllCourses();
    const newId = courses.length > 0 ? courses[courses.length - 1].id + 1 : 1;
    const courseToAdd = { id: newId, ...newCourse };

    addCourse(courseToAdd);
    res
      .status(201)
      .json({ msg: "Course added successfully", course: courseToAdd });
  } catch (err) {
    res.status(500).json({ msg: "Failed to add course", error: err.message });
  }
};
module.exports = { fetchAllCourses, createCourse };
