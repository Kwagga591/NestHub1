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

// 🌍 Load bilingual flashcard from Firestore
export async function loadCard() {
  const cardRef = doc(db, "speakease", "dailyCard");

  try {
    const docSnap = await getDoc(cardRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      document.getElementById("flashcardBox").innerHTML = `
        <strong>${data.lang1}:</strong> ${data.word1}<br>
        <strong>${data.lang2}:</strong> ${data.word2}
      `;
    } else {
      document.getElementById("flashcardBox").innerText = "No card found.";
    }
  } catch (error) {
    console.error("Firestore error:", error);
    document.getElementById("flashcardBox").innerText = "Error loading flashcard.";
  }
}

window.loadCard = loadCard;