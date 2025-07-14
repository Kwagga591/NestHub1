import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";

// Firebase config for NestHub
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Init Firebase and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 📖 Fetch coaching prompt from Firestore
export async function loadPrompt() {
  const promptRef = doc(db, "mindnest", "dailyPrompt");

  try {
    const docSnap = await getDoc(promptRef);

    if (docSnap.exists()) {
      document.getElementById("promptBox").innerText = docSnap.data().text;
    } else {
      document.getElementById("promptBox").innerText = "No prompt found.";
    }
  } catch (err) {
    console.error("Firestore error:", err);
    document.getElementById("promptBox").innerText = "Error loading prompt.";
  }
}

window.loadPrompt = loadPrompt;