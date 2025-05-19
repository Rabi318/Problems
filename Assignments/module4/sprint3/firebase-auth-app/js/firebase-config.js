import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";
const firebaseConfig = {
  apiKey: "Your-api-key",
  authDomain: "",
  databaseURL: "Your-database-url",
  projectId: "Your-project-id",
  storageBucket: "Your-storage-bucket",
  messagingSenderId: "Your-messaging-sender-id",
  appId: "Your-app-id",
  measurementId: "Your-measurement-id",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const database = getDatabase(app);

export { app, analytics, auth, database };
