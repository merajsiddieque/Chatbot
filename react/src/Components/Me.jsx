import React from "react";
import "./Me.css";

function Me({ text }) {
  return (
    <div className="me-container">
      <div className="me-message">{text}</div>
    </div>
  );
}

export default Me;
