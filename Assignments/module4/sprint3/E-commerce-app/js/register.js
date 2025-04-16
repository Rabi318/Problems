import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import {
  ref,
  set,
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";
import { auth, database } from "./firebase-config.js";

const registerForm = document.getElementById("register-form");

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const role = document.getElementById("role").value;
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    await set(ref(database, `users/${user.uid}`), {
      email: email,
      role: role,
    });
    alert("User registered successfully!");
    registerForm.reset();
    window.location.href = "login.html";
  } catch (error) {
    alert(error.message);
    console.log(error);
  }
});
