// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA5yDlRjN3rAYggHEZXmPRnvhOcDU6dl2I",
  authDomain: "paste-app-828f3.firebaseapp.com",
  projectId: "paste-app-828f3",
  storageBucket: "paste-app-828f3.firebasestorage.app",
  messagingSenderId: "538800113553",
  appId: "G-N19YPSRL3M"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };