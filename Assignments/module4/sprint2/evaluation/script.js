document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("darkModeToggle");
  if (toggle) {
    const dark = localStorage.getItem("darkMode") === "true";
    document.body.classList.toggle("dark-mode", dark);
    toggle.checked = dark;
    toggle.addEventListener("change", () => {
      const darkMode = toggle.checked;
      document.body.classList.toggle("dark-mode", darkMode);
      localStorage.setItem("darkMode", darkMode);
    });
  }
});

const URL =
  "https://novelsdb-4b70b-default-rtdb.asia-southeast1.firebasedatabase.app/notes.json";

document.getElementById("noteForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;
  const tags = document.getElementById("tags").value;
  const priority = document.getElementById("priority").value;
  const image = document.getElementById("image").value;
  if (!title || !content || !tags || !priority || !image) {
    alert("Please fill in all fields.");
    return;
  }
  const note = {
    title,
    content,
    tags,
    priority,
    image,
  };
  // console.log(note);
  localStorage.setItem("draft", JSON.stringify(note));
  try {
    const res = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
    if (!res.ok) {
      throw new Error("Failed to save note");
    }
    const data = await res.json();
    form.reset();
    localStorage.removeItem("draft");
    // console.log(data);
    alert("Note saved successfully!");
  } catch (error) {
    console.log(error);
  }
});

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
