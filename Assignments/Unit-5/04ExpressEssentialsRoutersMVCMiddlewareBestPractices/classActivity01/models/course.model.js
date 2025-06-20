const fs = require("fs");
const path = require("path");

const dbPath = path.join(__dirname, "../db.json");

function getAllCourses() {
  const data = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
  return data.courses;
}
function saveCourses(courses) {
  const data = { courses };
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

function addCourse(newCourse) {
  const courses = getAllCourses();
  courses.push(newCourse);
  saveCourses(courses);
}
module.exports = { getAllCourses, addCourse };
