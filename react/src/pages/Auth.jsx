import React, { useState } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      if (isLogin) {
        // 🟢 Login Flow
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        if (!user.emailVerified) {
          setError("⚠️ Please verify your email before logging in.");
          await auth.signOut();
          return;
        }

        navigate("/"); // Redirect to chatbot if verified
      } else {
        // 🟣 Signup Flow
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await sendEmailVerification(userCredential.user);

        setMessage(
          "✅ Account created! A verification email has been sent. Please check your inbox and verify your account before logging in."
        );

        // Optional: Sign out immediately to prevent auto-login before verification
        await auth.signOut();
      }
    } catch (err) {
      setError(err.message.replace("Firebase:", "").trim());
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-400 text-gray-800">
      {/* Main container */}
      <div className="flex flex-1 items-center justify-center p-6 md:p-0">
        <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-xl w-full max-w-md p-8 mx-2">
          {/* Header */}
          <h2 className="text-3xl md:text-4xl font-bold text-indigo-700 mb-3 text-center">
            {isLogin ? "Welcome Back 👋" : "Join Us ✨"}
          </h2>
          <p className="text-gray-600 mb-8 text-center text-sm md:text-base">
            {isLogin
              ? "Sign in to continue your journey with Chatbot"
              : "Create an account to start your conversations with Chatbot"}
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm md:text-base"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm md:text-base"
              required
            />

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            {message && <p className="text-green-600 text-sm text-center">{message}</p>}

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              {isLogin ? "Sign In" : "Sign Up"}
            </button>
          </form>

          {/* Switch between login/signup */}
          <div className="text-center mt-5 text-sm md:text-base text-gray-600">
            {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError("");
                setMessage("");
              }}
              className="text-indigo-600 font-semibold hover:underline"
            >
              {isLogin ? "Sign Up" : "Sign In"}
            </button>
          </div>

          {/* Back button */}
          <button
            onClick={() => navigate("/")}
            className="block mx-auto text-gray-500 mt-5 hover:underline text-sm"
          >
            ← Back to Chatbot
          </button>
        </div>
      </div>

      {/* Right info panel — hidden on mobile */}
      <div className="hidden md:flex flex-1 items-center justify-center p-10 text-white">
        <div className="text-center max-w-md space-y-5">
          <h1 className="text-5xl font-extrabold drop-shadow-lg">Chatbot 💬</h1>
          <p className="text-lg leading-relaxed opacity-90">
            A calm, empathetic space to express your thoughts.  
            Chatbot listens, understands, and gently supports your emotional well-being.
          </p>
          <p className="italic opacity-80">
            “You’re not alone — peace begins with one small conversation.” 🌿
          </p>
        </div>
      </div>
    </div>
  );
}
