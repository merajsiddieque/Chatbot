// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBqt-gGi4zTNfkkpgG5Ho1QBLBFZwO98CY",
  authDomain: "techphobia-63d91.firebaseapp.com",
  databaseURL: "https://techphobia-63d91-default-rtdb.firebaseio.com",
  projectId: "techphobia-63d91",
  storageBucket: "techphobia-63d91.firebasestorage.app",
  messagingSenderId: "977925384501",
  appId: "1:977925384501:web:d5f915c7a21877d93c447c",
  measurementId: "G-17GZ17S03V",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
