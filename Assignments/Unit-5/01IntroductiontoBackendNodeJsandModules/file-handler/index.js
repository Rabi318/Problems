const { appendFileData, readFileData } = require("./fileOperations");

console.log("Initial file content:");
readFileData();

setTimeout(() => {
  appendFileData();
  setTimeout(() => {
    console.log("Updated file content:");
    readFileData();
  }, 500);
}, 500);
