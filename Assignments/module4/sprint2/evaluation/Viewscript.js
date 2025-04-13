const URL =
  "https://novelsdb-4b70b-default-rtdb.asia-southeast1.firebasedatabase.app/notes";

const noteData = [];
async function fetchNotes() {
  try {
    const res = await fetch(`${URL}.json`);
    if (!res.ok) {
      throw new Error("Failed to fetch notes");
    }
    const data = await res.json();
    const noteArray = Object.entries(data).map(([key, value]) => ({
      id: key,
      ...value,
    }));
    // console.log(noteArray);
    noteData.push(...noteArray);
    dispalyNotes(noteArray);
  } catch (error) {
    console.log(error);
  }
}

fetchNotes();

function dispalyNotes(data) {
  const noteContainer = document.getElementById("notesContainer");
  // console.log(data);
  noteContainer.innerHTML = "";
  data.forEach((note) => {
    const div = document.createElement("div");
    div.className = "note-card";
    div.innerHTML = `
      <h2>${note.title}</h2>
      <p>${note.content}</p>
      <p>Tags: ${note.tags}</p>
      <p>Priority: ${note.priority}</p>
       <button id="edit-btn" onclick="editNote('${note.id} ', '${note.title}', '${note.content}', '${note.tags}', '${note.priority}', '${note.image}')">Edit</button>
    <button id="delete-btn" onclick="deleteNote('${note.id}')">Delete</button>
    `;
    noteContainer.appendChild(div);
  });
}

function filterNotes() {
  const searchInput = document.getElementById("search").value.toLowerCase();
  const priorityInput = document.getElementById("filterPriority").value;
  const filteredNotes = noteData.filter((note) => {
    const matchesSearch = note.title.toLowerCase().includes(searchInput);
    const matchesPriority =
      priorityInput === "all" || note.priority === priorityInput;
    return matchesSearch && matchesPriority;
  });
  dispalyNotes(filteredNotes);
}

document.getElementById("search").addEventListener("input", filterNotes);
document
  .getElementById("filterPriority")
  .addEventListener("change", filterNotes);

async function deleteNote(id) {
  try {
    window.confirm("Are you sure you want to delete this note?");
    if (!window.confirm) {
      return;
    }
    const res = fetch(`${URL}/${id}.json`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    fetchNotes();
  } catch (error) {
    console.log(error);
  }
}

const hamburger = document.getElementById("menuToggle");
const navLinks = document.getElementById("nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});
document.querySelectorAll(".nav-link a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("show");
  });
});

function editNote(id, title, content, tags, priority, image) {
  console.log(id);
}
