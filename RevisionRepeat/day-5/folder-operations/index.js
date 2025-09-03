const fs = require("fs");
const path = require("path");

const folderPath = path.join(__dirname, "students");

//created folder
if (!fs.existsSync(folderPath)) {
  fs.mkdirSync(folderPath);
  console.log("Folder 'student' created.");
} else {
  console.log("Folder 'student' already exists");
}

//created 5 students files
for (let i = 1; i <= 5; i++) {
  const filePath = path.join(folderPath, `student${i}.txt`);
  fs.writeFileSync(filePath, `This is student ${i}`);
  console.log(`Created file: student${i}.txt`);
}

//Read all files
console.log("\n📖 Reading all student files:\n");
const files = fs.readdirSync(folderPath);
files.forEach((file) => {
  const filePath = path.join(folderPath, file);
  const content = fs.readFileSync(filePath, "utf-8");
  console.log(`${file}: ${content}`);
});

//delete all files
console.log("\n Deleting all student files...");
files.forEach((file) => {
  const filePath = path.join(folderPath, file);
  fs.unlinkSync(filePath);
  console.log(`Deleted: ${file}`);
});

//Delete the folder
fs.rmdirSync(folderPath);
console.log("\n 'students' folder delted successfulyy");
