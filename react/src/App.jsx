import React from "react";
import { Routes, Route } from "react-router-dom";
import Chatbot from "./components/Chatbot";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile"; // <-- import
import ResetPassword from "./pages/Reset-Password";
import Help from "./pages/Help";
import ChatbotSignMode from "./SignLanguage/ChatbotSignMode";



export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Chatbot />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/help" element={<Help />} />
      <Route path="/sign-chat" element={<ChatbotSignMode />} />


    </Routes>
  );
}
