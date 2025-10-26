// src/Components/DeleteAccount.jsx
import React, { useState } from "react";
import { auth, db } from "../firebase";
import { deleteUser } from "firebase/auth";
import { doc, deleteDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./DeleteAccount.css";


function DeleteAccount() {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleDelete = async () => {
    const user = auth.currentUser;

    if (!user) {
      setError("No user is currently logged in.");
      return;
    }

    const email = user.email; // Use email as doc ID (your structure)

    try {
      // 1️⃣ Delete Firestore Profile document
      await deleteDoc(doc(db, "Profile", email));

      // 2️⃣ Delete Firestore Chat document
      await deleteDoc(doc(db, "Chat", email));

      // 3️⃣ Delete Firebase Auth user
      await deleteUser(user);

      alert("Account deleted successfully.");
      navigate("/"); // Redirect to login page
    } catch (err) {
      if (err.code === "auth/requires-recent-login") {
        alert("Please sign in again to confirm account deletion.");
      }
      setError(err.message);
      console.error("Delete account error:", err);
    }
  };

  return (
    <main className="delete-account-container">
      <h1>Delete Account</h1>
      <p style={{ color: "red", fontWeight: "bold" }}>
        Warning: This action cannot be undone.
      </p>

      <button
        onClick={handleDelete}
        style={{
          background: "red",
          color: "white",
          border: "none",
          padding: "10px 18px",
          borderRadius: "6px",
          cursor: "pointer",
          marginTop: "20px",
        }}
      >
        Delete My Account
      </button>

      {error && <p style={{ color: "red", marginTop: "12px" }}>{error}</p>}
    </main>
  );
}

export default DeleteAccount;
