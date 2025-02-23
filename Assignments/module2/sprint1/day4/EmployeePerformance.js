function processEmployeePerformance(employees) {
  const filteredEmployees = employees.filter(
    (employee) => employee.tasksCompleted > 5
  );

  const performanceEmployees = filteredEmployees.map((employee) => {
    let performance = "";
    if (employee.rating > 4.5) {
      performance = "Excellent";
    } else if (employee.rating >= 3 && employee.rating <= 4.5) {
      performance = "Good";
    } else {
      performance = "Needs Improvement";
    }
    return { name: employee.name, performance };
  });

  const sortedEmployees = performanceEmployees.sort((a, b) => {
    const performanceOrder = { Excellent: 3, Good: 2, "Needs Improvement": 1 };
    return performanceOrder[b.performance] - performanceOrder[a.performance];
  });

  return sortedEmployees;
}

const employees = [
  { name: "Alice", tasksCompleted: 8, rating: 4.7 },
  { name: "Bob", tasksCompleted: 4, rating: 4.0 },
  { name: "Charlie", tasksCompleted: 6, rating: 3.5 },
  { name: "David", tasksCompleted: 10, rating: 4.9 },
  { name: "Eve", tasksCompleted: 7, rating: 2.8 },
];

console.log(processEmployeePerformance(employees));
