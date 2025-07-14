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

// 🧠 Load business resource from Firestore
export async function loadResource() {
  const docRef = doc(db, "worknest", "dailyTool");

  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      document.getElementById("resourceBox").innerHTML = `
        <strong>${data.title}</strong><br>
        ${data.description}<br>
        <a href="${data.link}" target="_blank">Open Tool</a>
      `;
    } else {
      document.getElementById("resourceBox").innerText = "No resource found.";
    }
  } catch (error) {
    console.error("Firestore error:", error);
    document.getElementById("resourceBox").innerText = "Error loading resource.";
  }
}

window.loadResource = loadResource;