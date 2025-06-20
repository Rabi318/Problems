const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/test", (req, res) => {
  res.json({ msg: "This is a test route" });
});

//get route that read all the courses
app.get("/all-courses", (req, res) => {
  let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
  let courses = data.courses;
  res.json({ msg: "List of courses", courses });
});
app.get("/course/:id", (req, res) => {
  const id = Number(req.params.id);
  let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
  let courses = data.courses;
  let index = courses.findIndex((course) => course.id === id);

  if (index === -1) {
    res.status(404).json({ msg: "Course not found" });
  } else {
    res.json({ msg: "Course details", course: courses[index] });
  }
});

//get course by title throgh query params
app.get("/course-title", (req, res) => {
  try {
    if (!req.query.title) {
      return res
        .status(400)
        .json({ msg: "Please provide a course title as a query parameter." });
    }

    const title = req.query.title.toLowerCase();
    const data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
    const courses = data.courses;

    const course = courses.find((c) => c.title.toLowerCase() === title);

    if (!course) {
      return res.status(404).json({ msg: "Course not found" });
    }

    res.json({ msg: "Course details", course });
  } catch (err) {
    res.status(500).json({ msg: "Internal server error", error: err.message });
  }
});

app.post("/add-course", (req, res) => {
  let newCourse = req.body;
  console.log(newCourse);
  let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
  let courses = data.courses;

  let id = courses[courses.length - 1].id + 1;
  newCourse = { ...newCourse, id };
  courses.push(newCourse);
  fs.writeFileSync("./db.json", JSON.stringify(data));
  res.status(201).json({ msg: "Course added successfully" });
});

//update
app.put("/update-course/:id", (req, res) => {
  //we need id
  const id = Number(req.params.id);
  let updatedCourse = req.body;
  let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
  let courses = data.courses;

  let courseIndex = courses.findIndex((course) => course.id == id);
  if (courseIndex === -1) {
    res.status(404).json({ msg: "Course not found" });
  } else {
    courses[courseIndex] = { ...courses[courseIndex], ...updatedCourse };
    fs.writeFileSync("./db.json", JSON.stringify(data));
    res.json({
      msg: "Course updated successfully",
      course: courses[courseIndex],
    });
  }
});

//delete
app.delete("/delete-course/:id", (req, res) => {
  const id = Number(req.params.id);

  try {
    let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
    let courses = data.courses;

    let courseIndex = courses.findIndex((course) => course.id === id);

    if (courseIndex === -1) {
      return res.status(404).json({ msg: "Course not found" });
    }

    courses.splice(courseIndex, 1);
    fs.writeFileSync("./db.json", JSON.stringify(data, null, 2)); // pretty print

    res.json({ msg: "Course deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Failed to delete course", error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT} 😎😎`);
});
