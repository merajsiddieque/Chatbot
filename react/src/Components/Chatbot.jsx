// Chatbot.jsx
import React from "react";
import "./Chatbot.css";

function Chatbot({ text }) {
  return (
    <div className="chatbot-container">
      <div className="chatbot-message">{text}</div>
    </div>
  );
}

export default Chatbot;
