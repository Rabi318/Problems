const fs = require("fs");
const path = require("path");
const dbPath = path.join(__dirname, "../db.json");
function readBooks() {
  return JSON.parse(fs.readFileSync(dbPath, "utf-8")).books;
}
function writeBooks(books) {
  fs.writeFileSync(dbPath, JSON.stringify({ books }, null, 2));
}

module.exports = { readBooks, writeBooks };
