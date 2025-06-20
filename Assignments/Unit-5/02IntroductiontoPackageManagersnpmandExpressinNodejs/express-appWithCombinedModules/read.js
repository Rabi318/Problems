const fs = require("fs");

const path = require("path");

const filePath = path.join(__dirname, "Data.txt");

function readFileContent(callback) {
  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      callback(`Error reading file: ${err.message}`);
      return;
    }
    callback(null, data);
  });
}
module.exports = readFileContent;
