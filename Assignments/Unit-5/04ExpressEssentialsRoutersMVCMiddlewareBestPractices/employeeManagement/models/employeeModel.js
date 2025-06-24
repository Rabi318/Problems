const fs = require("fs");
const path = require("path");
const FILE_PATH = path.join(__dirname, "../employees.json");

function readEmployees() {
  if (!fs.existsSync(FILE_PATH)) return [];
  const data = fs.readFileSync(FILE_PATH);
  return JSON.parse(data);
}

function writeEmployees(data) {
  fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));
}

module.exports = { readEmployees, writeEmployees };
