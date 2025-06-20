const express = require("express");
const router = express.Router();
const { fetchAllCourses, createCourse } = require("../services/courseService");
const validateCourse = require("../middlewares/validateCourse");

router.get("/all", fetchAllCourses);
router.post("/add", validateCourse, createCourse);

module.exports = router;
