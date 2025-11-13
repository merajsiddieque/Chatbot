import React, { useState, useRef, useEffect } from "react";
import SignInput from "./SignInput";

export default function ChatbotSignMode() {
  const [messages, setMessages] = useState([
    { id: 1, from: "bot", text: "👋 Hello! Show a gesture to begin." },
  ]);
  const chatEndRef = useRef(null);

  const handleReply = ({ gesture, reply }) => {
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), from: "user", text: `✋ Gesture: ${gesture}` },
      { id: Date.now() + 1, from: "bot", text: reply },
    ]);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="h-screen w-full bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center p-6 overflow-hidden">

      <h1 className="text-2xl font-bold text-indigo-700 mb-3">
        🤖 Sign Language Chat
      </h1>

      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg flex flex-col overflow-hidden h-[88vh]">

        {/* CAMERA FIXED */}
        <div className="p-4 border-b bg-gray-50 shrink-0">
          <h2 className="text-lg font-semibold text-indigo-600 mb-2">
            Sign Detection
          </h2>
          <SignInput onReply={handleReply} />
        </div>

        {/* CHAT HEADER FIXED */}
        <div className="p-4 shrink-0">
          <h2 className="text-lg font-semibold text-indigo-600">Chat</h2>
        </div>

        {/* ONLY MESSAGES SCROLL */}
        <div className="flex-1 overflow-y-auto px-4 pb-6">
          <div className="border rounded-lg p-3 bg-gray-50 space-y-3 min-h-[300px]">

            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`p-3 rounded-lg max-w-[80%] ${
                  msg.from === "bot"
                    ? "bg-indigo-100 self-start"
                    : "bg-green-100 self-end ml-auto"
                }`}
              >
                {msg.text}
              </div>
            ))}

            <div ref={chatEndRef} />
          </div>
        </div>
      </div>
    </div>
  );
}
