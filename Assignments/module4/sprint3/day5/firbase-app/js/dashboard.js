import { auth, db } from "../firebase-config.js";
import {
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import {
  doc,
  setDoc,
  getDocs,
  collection,
  addDoc,
  getDoc,
  deleteDoc,
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";
document.addEventListener("DOMContentLoaded", async () => {
  const notesList = document.getElementById("notes-list");
  const noteInput = document.getElementById("note-input");
  const addNoteBtn = document.getElementById("add-note-btn");

  let currentUser = null;

  //check auth state
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      currentUser = user;
      document.getElementById("user-email").innerText = currentUser.email;

      //fetch user role
      const userDocRef = doc(db, "users", currentUser.uid);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        const role = userDoc.data().role;
        document.getElementById("user-role").innerText = role;

        //Load Notes
        loadNotes(user, role);
      }
    } else {
      window.location.href = "index.html";
    }
  });

  async function loadNotes(user, role) {
    notesList.innerHTML = "";
    const notesRef = collection(db, "notes");

    //Fetch all the notes so every user can see all the notes
    const querySnapShot = await getDocs(notesRef);
    querySnapShot.forEach((doc) => {
      const noteData = doc.data();
      displayNote(doc.id, noteData, user.uid, role);
    });
  }

  function displayNote(id, data, userId, role) {
    const noteDiv = document.createElement("div");
    noteDiv.classList.add("note");
    // noteDiv.innerHTML = `

    //   <p>${data.content}</p>
    //   <small>${data.userEmail}</small>

    // `;
    //crate elements
    const noteContent = document.createElement("p");
    noteContent.innerText = data.content;
    const noteOwner = document.createElement("small");
    noteOwner.innerText = `By: ${data.userEmail}`;
    noteDiv.append(noteContent, noteOwner);
    //only admin and owners can delete the notes and edit
    if (data.userId === userId || role === "admin") {
      //edit btn
      const editBtn = document.createElement("button");
      editBtn.innerText = "📝";
      editBtn.classList.add("edit-btn");

      editBtn.onclick = () => {
        const editTextArea = document.createElement("textarea");
        editTextArea.value = noteContent.innerText;
        const saveBtn = document.createElement("button");
        saveBtn.innerText = "Save";
        saveBtn.classList.add("save-btn");
        saveBtn.onclick = async () => {
          const newContent = editTextArea.value.trim();
          if (newContent != "") {
            await setDoc(doc(db, "notes", id), {
              ...data,
              content: newContent,
            });
            noteContent.innerText = newContent;
            noteDiv.replaceChild(noteContent, editTextArea);
            noteDiv.replaceChild(editBtn, saveBtn);
          }
        };
        noteDiv.replaceChild(editTextArea, noteContent);
        noteDiv.replaceChild(saveBtn, editBtn);
      };

      //delete btn
      const deleteBtn = document.createElement("button");
      deleteBtn.innerText = "❌";
      deleteBtn.classList.add("delete-btn");
      deleteBtn.onclick = async () => {
        await deleteDoc(doc(db, "notes", id));
        noteDiv.remove();
      };
      noteDiv.appendChild(editBtn);
      noteDiv.appendChild(deleteBtn);
    }
    notesList.appendChild(noteDiv);
  }

  //add notes
  addNoteBtn.addEventListener("click", async () => {
    const content = noteInput.value.trim();
    if (content === "") {
      alert("Please enter a note");
      return;
    }
    try {
      await addDoc(collection(db, "notes"), {
        content,
        userId: currentUser.uid,
        userEmail: currentUser.email,
        createdAt: new Date(),
      });
      noteInput.value = "";
      loadNotes(currentUser, document.getElementById("user-role").innerText);
    } catch (error) {
      console.log(error);
    }
  });
});
