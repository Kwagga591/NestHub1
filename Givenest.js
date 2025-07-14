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

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ❤️ Load donation or community message
export async function loadSupportMessage() {
  const docRef = doc(db, "givenest", "communityMessage");

  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      document.getElementById("giveBox").innerHTML = `
        <strong>${data.title}</strong><br>
        ${data.message}
      `;
    } else {
      document.getElementById("giveBox").innerText = "No message available.";
    }
  } catch (error) {
    console.error("Firestore error:", error);
    document.getElementById("giveBox").innerText = "Error loading impact data.";
  }
}

window.loadSupportMessage = loadSupportMessage;