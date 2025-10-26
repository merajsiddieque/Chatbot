import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Header from "./Components/Header";
import Body from "./Components/Body";
import Footer from "./Components/Footer";
import UserProfile from "./Components/UserProfile";
import Auth from "./Components/Auth";
import DeleteAccount from "./Components/DeleteAccount";
import ForgotPassword from "./Components/ForgotPassword";
import ResendVerification from "./Components/ResendVerification";
import ResetPassword from "./Components/ResetPassword";
import { db, auth } from "./firebase";
import { collection, query, orderBy, addDoc } from "firebase/firestore";
import { onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

function AppRoutes() {
  const location = useLocation();
  const [messages, setMessages] = useState([]);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fullscreen routes where header/footer should be hidden
  const fullScreenRoutes = [
    "/login",
    "/forgot-password",
    "/reset-password",
    "/resend-verification",
    "/delete-account",
  ];
  const hideHeaderFooter = fullScreenRoutes.includes(location.pathname);

  // Firebase auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.emailVerified) setUserLoggedIn(true);
      else setUserLoggedIn(false);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Load messages from Firebase
  useEffect(() => {
    if (!userLoggedIn) return;

    const user = auth.currentUser;
    if (!user) return;

    const userEmail = user.email;

    const q = query(
      collection(db, "Chats", userEmail, "messages"),
      orderBy("timestamp")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => doc.data()));
    });

    return () => unsubscribe();
  }, [userLoggedIn]);

  const addMessage = async (msg) => {
    const user = auth.currentUser;
    if (!user) return;

    const userEmail = user.email;

    try {
      await addDoc(collection(db, "Chats", userEmail, "messages"), {
        ...msg,
        timestamp: new Date(),
      });

      // ❌ REMOVE setMessages here — realtime listener handles UI update
    } catch (err) {
      console.error("Error adding message:", err);
    }
  };

  const handleAuthSuccess = () => setUserLoggedIn(true);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        Loading...
      </div>
    );
  }

  return (
    <>
      {/* Render header/footer only if not hidden */}
      {!hideHeaderFooter && userLoggedIn && <Header />}

      <Routes>
        <Route
          path="/"
          element={
            userLoggedIn ? (
              <Body messages={messages} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/profile"
          element={userLoggedIn ? <UserProfile /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={
            userLoggedIn ? (
              <Navigate to="/" />
            ) : (
              <Auth onAuthSuccess={handleAuthSuccess} />
            )
          }
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/resend-verification" element={<ResendVerification />} />
        <Route
          path="/delete-account"
          element={userLoggedIn ? <DeleteAccount /> : <Navigate to="/login" />}
        />
      </Routes>

      {!hideHeaderFooter && userLoggedIn && <Footer addMessage={addMessage} />}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}
