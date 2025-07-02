const express = require("express");

const router = express.Router();
const studentController = require("../controllers/studentController");

router.get("/courses/:id", studentController.getStudentCourse);
router.post("/", studentController.createStudent);
router.delete("/:id", studentController.deleteStudent);

module.exports = router;
