import React from "react";
import sendIcon from "../assets/send.svg";
import "./Footer.css";

function Footer({ addMessage }) {
  const [input, setInput] = React.useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    addMessage({ type: "me", text: input });
    setInput("");
  };

  return (
    <div className="footer">
      <div className="footer-input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="footer-input"
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
      </div>
      <div className="footer-send-icon-container">
        <img
          src={sendIcon}
          alt="Send"
          className="footer-send-icon"
          onClick={handleSend}
          style={{ cursor: "pointer" }}
        />
      </div>
    </div>
  );
}

export default Footer;
