import React, { useState } from "react";
import { auth, db } from "../firebase";
import "./Auth.css";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

function Auth({ onAuthSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false); // <-- default to Sign In
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      if (isSignUp) {
        // Sign Up flow
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await sendEmailVerification(user);
        setMessage(
          `✅ Account created! Verification email sent to ${email}. ` +
          `Check your inbox and spam folder. You can request a new link from the login page if needed.`
        );

        await auth.signOut();

        // Create Firestore docs
        await setDoc(doc(db, "Profile", email), { name: "", email });
        await setDoc(doc(db, "Chat", email), { messages: [] });

        setTimeout(() => {
          setIsSignUp(false);
          setMessage("");
        }, 4000);

      } else {
        // Sign In flow
        const { user } = await signInWithEmailAndPassword(auth, email, password);
        if (!user.emailVerified) {
          setError("⚠️ Please verify your email before signing in. Check your inbox and spam folder.");
          await auth.signOut();
          return;
        }
        onAuthSuccess();
      }
    } catch (err) {
      switch (err.code) {
        case "auth/email-already-in-use":
          setError("This email is already registered. Please sign in instead.");
          break;
        case "auth/weak-password":
          setError("Password should be at least 6 characters.");
          break;
        case "auth/invalid-email":
          setError("Invalid email address.");
          break;
        case "auth/user-not-found":
        case "auth/wrong-password":
          setError("Invalid email or password.");
          break;
        default:
          setError(err.message);
      }
    }
  };

  return (
    <div className="main-auth-container" role="main">
      <div className="auth-container">
        <h2>{isSignUp ? "Sign Up" : "Sign In"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password (min 6 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
          {error && <p className="error-message">{error}</p>}
          {message && <p className="success-message">{message}</p>}

          <button type="submit">{isSignUp ? "Sign Up" : "Sign In"}</button>
        </form>

        {/* Switch between login/signup */}
        <p
          className="switch-link"
          onClick={() => {
            setIsSignUp(!isSignUp);
            setError("");
            setMessage("");
          }}
        >
          {isSignUp
            ? "Already have an account? Sign In"
            : "Don't have an account? Sign Up"}
        </p>

        {/* Forgot password link */}
        {!isSignUp && (
          <p
            className="forgot-password-link"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot Password?
          </p>
        )}
      </div>
    </div>
  );
}

export default Auth;
