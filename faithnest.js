import { getStorage, ref, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";
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

// Init Firebase and Storage
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

// 🎶 Play faith-based audio from Firebase Storage
export function playFaithTrack() {
  const audioRef = ref(storage, 'faithnest/biblemusic.mp3'); // Upload your file here

  getDownloadURL(audioRef)
    .then(url => {
      const audio = new Audio(url);
      audio.play();
    })
    .catch(error => {
      console.error("Storage error:", error);
      alert("Bible track unavailable. Check your Firebase Storage setup.");
    });
}

window.playFaithTrack = playFaithTrack;