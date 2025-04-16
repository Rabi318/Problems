import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import {
  ref,
  get,
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";
import { auth, database } from "./firebase-config.js";
const loginForm = document.getElementById("login-form");
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    const userSnapshot = await get(ref(database, `users/${user.uid}`));
    const userData = userSnapshot.val();
    if (userData) {
      sessionStorage.setItem("userRole", userData.role);
      if (userData.role === "admin") {
        window.location.href = "admin-dashboard.html";
      } else {
        window.location.href = "user-dashboard.html";
      }
    } else {
      alert("User not found");
    }
  } catch (error) {
    alert("Incorrect email or password");
    console.log(error);
  }
});
