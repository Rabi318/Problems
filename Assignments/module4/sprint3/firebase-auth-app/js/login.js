import { auth, database } from "./firebase-config.js";
import {
  ref,
  get,
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";

document.getElementById("loginBtn").addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    const snapshot = await get(ref(database, `users/${user.uid}`));
    if (snapshot.exists()) {
      const userData = snapshot.val();
      alert("Login successful! Welcome " + userData.name);
      sessionStorage.setItem("userId", user.uid);
      window.location.href = "dashboard.html";
    } else {
      alert("User data not found!");
    }
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
  } catch (error) {
    console.error("Error logging in: ", error);
    alert("Error: " + error.message);
  }
});
