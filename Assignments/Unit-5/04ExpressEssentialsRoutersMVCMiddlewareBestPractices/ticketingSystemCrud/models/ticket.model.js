const fs = require("fs");
const path = require("path");

const dbPath = path.join(__dirname, "../db.json");

function readTickets() {
  return JSON.parse(fs.readFileSync(dbPath, "utf-8")).tickets;
}

function writeTickets(tickets) {
  const data = { tickets };
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

module.exports = { readTickets, writeTickets };
