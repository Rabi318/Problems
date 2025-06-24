const { readEmployees, writeEmployees } = require("../models/employeeModel");

exports.getEmployees = (req, res) => {
  const employees = readEmployees();
  res.json(employees);
};

exports.addEmployee = (req, res) => {
  const { name, position, department, salary, status } = req.body;
  if (!name || !position || !department || !salary || !status) {
    return res.status(400).json({ error: "All fields are required." });
  }
  const employees = readEmployees();
  const newEmployee = {
    id: Date.now().toString(),
    name,
    position,
    department,
    salary,
    status,
  };
  employees.push(newEmployee);
  writeEmployees(employees);
  res.status(201).json(newEmployee);
};

exports.updateEmployee = (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const employees = readEmployees();
  const index = employees.findIndex((e) => e.id === id);
  if (index === -1)
    return res.status(404).json({ error: "Employee not found." });

  employees[index] = { ...employees[index], ...updates };
  writeEmployees(employees);
  res.json(employees[index]);
};

exports.deleteEmployee = (req, res) => {
  const { id } = req.params;
  const employees = readEmployees();
  const index = employees.findIndex((e) => e.id === id);
  if (index === -1)
    return res.status(404).json({ error: "Employee not found." });

  const removed = employees.splice(index, 1)[0];
  writeEmployees(employees);
  res.json({ message: "Employee deleted", employee: removed });
};
