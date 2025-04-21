const employees = [
  {
    name: "Alice",
    baseSalary: 5000,
    department: "Engineering",
    yearsOfService: 4,
    performanceScore: 8,
  },
  {
    name: "Bob",
    baseSalary: 4500,
    department: "Marketing",
    yearsOfService: 2,
    performanceScore: 7,
  },
  {
    name: "Charlie",
    baseSalary: 6000,
    department: "Engineering",
    yearsOfService: 7,
    performanceScore: 9,
  },
  {
    name: "Diana",
    baseSalary: 5500,
    department: "HR",
    yearsOfService: 3,
    performanceScore: 6,
  },
];

//Original Total
let originalTotal = 0;
employees.forEach((emp) => (originalTotal += emp.baseSalary));
console.log(`Original salary total: $${originalTotal.toFixed(2)}`);

//Apply service & performance bonus
employees.forEach((emp) => {
  let bonus = 0;
  if (emp.yearsOfService >= 3) {
    bonus += emp.baseSalary * 0.05;
  }
  if (emp.performanceScore >= 8) {
    bonus += emp.baseSalary * 0.1;
  }
  emp.finalSalary = emp.baseSalary + bonus;
});
let bonusTotal = employees.reduce((sum, emp) => sum + emp.finalSalary, 0);
console.log(`After service and performance bonuses: $${bonusTotal.toFixed(2)}`);

//Department bonus
employees.forEach((emp) => {
  if (emp.department === "Engineering") {
    emp.finalSalary += emp.finalSalary * 0.15;
  }
});
let deptTotal = employees.reduce((sum, emp) => sum + emp.finalSalary, 0);
console.log(`After department adjustments: $${deptTotal.toFixed(2)}`);

//Tax deduction
employees.forEach((emp) => {
  emp.finalSalary -= emp.finalSalary * 0.07;
});

let finalTotal = employees.reduce((sum, emp) => sum + emp.finalSalary, 0);
console.log(`Final salary after all calculations: $${finalTotal.toFixed(2)}`);
