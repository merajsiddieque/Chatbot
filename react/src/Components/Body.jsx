// Body.jsx
import React from "react";
import "./Body.css";
import Me from "./Me";
import Chatbot from "./Chatbot";

function Body({ messages }) {
  return (
    <div className="divbody">
      <div className="bodycontent">
        {messages.map((msg, index) =>
          msg.type === "me" ? (
            <Me key={index} text={msg.text} />
          ) : (
            <Chatbot key={index} text={msg.text} />
          )
        )}
      </div>
    </div>
  );
}


export default Body;
