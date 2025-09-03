const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "notes.txt");

//ensure notes.txt exist
function ensureFileExists() {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "");
  }
}

//Add a new note
function addNote(note) {
  ensureFileExists();
  fs.appendFileSync(filePath, note + "\n");
  console.log("Note added successfully");
}

//List all notes
function listNotes() {
  ensureFileExists();
  const data = fs.readFileSync(filePath, "utf-8").trim();

  if (!data) {
    console.log("📭 No notes found.");
    return;
  }

  const notes = data.split("\n");
  console.log("📝 Your Notes:");
  notes.forEach((note, index) => {
    console.log(`${index + 1}. ${note}`);
  });
}

// Delete a note by line number
function deleteNote(lineNumber) {
  ensureFileExists();
  const data = fs.readFileSync(filePath, "utf-8").trim();

  if (!data) {
    console.log("📭 No notes found.");
    return;
  }

  let notes = data.split("\n");

  if (lineNumber < 1 || lineNumber > notes.length) {
    console.log("❌ Error: Invalid note number.");
    return;
  }

  notes.splice(lineNumber - 1, 1);
  fs.writeFileSync(filePath, notes.join("\n") + (notes.length ? "\n" : ""));
  console.log(`🗑️ Note ${lineNumber} deleted successfully!`);
}

const [, , command, ...args] = process.argv;

switch (command) {
  case "add":
    const note = args.join(" ");
    if (!note) {
      console.log("❌ Please provide a note to add.");
    } else {
      addNote(note);
    }
    break;

  case "list":
    listNotes();
    break;

  case "delete":
    const num = parseInt(args[0]);
    if (isNaN(num)) {
      console.log("❌ Please provide a valid note number.");
    } else {
      deleteNote(num);
    }
    break;

  default:
    console.log(`
📘 Notes Manager CLI
Usage:
  node notes.js add "Your note here"   → Add a new note
  node notes.js list                   → List all notes
  node notes.js delete <noteNumber>    → Delete a note by its number
    `);
}
