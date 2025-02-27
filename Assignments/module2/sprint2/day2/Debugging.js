function manageStudents(
  students,
  nameToAdd,
  indexToAdd,
  nameToSearch,
  separator
) {
  students.splice(indexToAdd, 0, nameToAdd);

  console.log(students.includes(nameToSearch));

  console.log(students.join(separator));
}

// Test case 1
let students1 = ["Alice", "Bob", "Charlie"];
manageStudents(students1, "David", 1, "Eve", ",");

// Test case 2
let students2 = ["Alice", "Bob", "Charlie"];
manageStudents(students2, "Eve", 2, "Eve", "-");

// Test case 3
let students3 = ["Alice", "Bob", "Charlie"];
manageStudents(students3, "Grace", 0, "Grace", "|");

// Test case 4
let students4 = ["Alice", "Bob", "Charlie"];
manageStudents(students4, "Zara", 3, "Zara", ",");
