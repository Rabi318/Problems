const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;
const dbPath = path.join(__dirname, "db.json");

app.use(express.json());

// Utility functions
const readData = () => JSON.parse(fs.readFileSync(dbPath, "utf-8"));
const writeData = (data) =>
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));

// POST /students → Add a new student
app.post("/students", (req, res) => {
  const { name, course, batch } = req.body;

  if (!name || !course || !batch) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const data = readData();
  const newId = data.students.length
    ? data.students[data.students.length - 1].id + 1
    : 1;

  const newStudent = { id: newId, name, course, batch };
  data.students.push(newStudent);
  writeData(data);

  res.status(201).json({ message: "Student added", student: newStudent });
});

// GET /students → Fetch all students
app.get("/students", (req, res) => {
  const data = readData();
  res.json(data.students);
});

// GET /students/search?course=<course> → Filter students by course
app.get("/students/search", (req, res) => {
  const course = req.query.course?.toLowerCase();
  if (!course) {
    return res
      .status(400)
      .json({ message: "Please provide a 'course' query parameter" });
  }

  const data = readData();
  const filtered = data.students.filter((s) =>
    s.course.toLowerCase().includes(course)
  );

  if (filtered.length === 0) {
    return res.status(404).json({ message: "No students found" });
  }

  res.json(filtered);
});

// GET /students/:id → Fetch student by ID
app.get("/students/:id", (req, res) => {
  const id = Number(req.params.id);
  const student = readData().students.find((s) => s.id === id);

  if (!student) {
    return res.status(404).json({ message: "No students found" });
  }

  res.json(student);
});

// PUT /students/:id → Update student record
app.put("/students/:id", (req, res) => {
  const id = Number(req.params.id);
  const { name, course, batch } = req.body;
  const data = readData();
  const index = data.students.findIndex((s) => s.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "No students found" });
  }

  data.students[index] = { id, name, course, batch };
  writeData(data);
  res.json({ message: "Student updated", student: data.students[index] });
});

// DELETE /students/:id → Delete student record
app.delete("/students/:id", (req, res) => {
  const id = Number(req.params.id);
  const data = readData();
  const index = data.students.findIndex((s) => s.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "No students found" });
  }

  const removed = data.students.splice(index, 1);
  writeData(data);
  res.json({ message: "Student deleted", student: removed[0] });
});

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
