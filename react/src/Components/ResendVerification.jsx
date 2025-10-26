// src/Components/ResendVerification.jsx
import React, { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import "./ResendVerification.css";

function ResendVerification() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const handleResend = async (e) => {
    e.preventDefault();
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(user);
      setMsg("Verification email sent! Check your inbox.");
      await auth.signOut();
    } catch (error) {
      setErr(error.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Resend Verification Email</h2>
      <form onSubmit={handleResend}>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {err && <p style={{color:"red"}}>{err}</p>}
        {msg && <p style={{color:"green"}}>{msg}</p>}
        <button type="submit">Resend Email</button>
      </form>
    </div>
  );
}

export default ResendVerification;
