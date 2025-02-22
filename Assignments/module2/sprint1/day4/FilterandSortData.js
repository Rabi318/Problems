const Students = [
  { name: "Alice", marks: 58 },

  { name: "Bob", marks: 85 },

  { name: "Charlie", marks: 92 },

  { name: "David", marks: 45 },
];

function ProcessStudents(students) {
  const passedStudents = students.filter((student) => student.marks >= 60);
  const sortedStudents = passedStudents.sort((a, b) => b.marks - a.marks);
  const name = sortedStudents.map((student) => student.name);
  console.log(name);
}

ProcessStudents(Students);
