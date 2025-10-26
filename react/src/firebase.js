// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBus3djH1f9IJOk9p9pubVTlapBjV1AgG8",
  authDomain: "chatbot-17b9b.firebaseapp.com",
  projectId: "chatbot-17b9b",
  storageBucket: "chatbot-17b9b.appspot.com",
  messagingSenderId: "287326693775",
  appId: "1:287326693775:web:63ead805ea9eda8e09c3fa",
  measurementId: "G-RQX6BKEW74"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
