const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "data.txt");

function readFileData() {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      if (err.code === "ENOENT") {
        console.log(
          "File not found. Creating new file with default content..."
        );
        fs.writeFile(filePath, "", (writeErr) => {
          if (writeErr) {
            console.error("Error creating file:", writeErr);
            return;
          }
          console.log("New file created. It is currently empty.");
        });
      } else {
        console.error("Error reading file:", err);
      }
    } else {
      console.log(data ? data : "File is empty.");
    }
  });
}

function appendFileData() {
  fs.appendFile(filePath, "This is append data\n", (err) => {
    if (err) {
      console.log("Error appending data:", err);
    } else {
      console.log("Appending data....\n");
    }
  });
}

module.exports = {
  readFileData,
  appendFileData,
};
