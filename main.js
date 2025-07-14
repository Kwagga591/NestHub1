import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);

export function loadApp(moduleName) {
  fetch(`apps/${moduleName}/${moduleName}.html`)
    .then(res => res.text())
    .then(html => {
      document.getElementById("appContainer").innerHTML = html;
      import(`./apps/${moduleName}/${moduleName}.js`);
    });
}

window.loadApp = loadApp;