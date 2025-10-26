// Chatbot.jsx
import React from "react";
import "./chatbot.css";

function chatbot({ text }) {
  return (
    <div className="chatbot-container">
      <div className="chatbot-message">{text}</div>
    </div>
  );
}

export default chatbot;
