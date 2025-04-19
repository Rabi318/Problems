import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBEceO71MxbH5jvrOA_1u5WhlXPZ1VWG9c",
  authDomain: "notes-app-25493.firebaseapp.com",
  projectId: "notes-app-25493",
  storageBucket: "notes-app-25493.firebasestorage.app",
  messagingSenderId: "183830240397",
  appId: "1:183830240397:web:778e9649ab7f3388dc96c4",
  measurementId: "G-GWYCSK1575",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
