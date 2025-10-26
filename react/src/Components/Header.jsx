// Header.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import icon from "../assets/icon.jpg";
import "./Header.css";
import ProfileDropdown from "./Profile";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

function Header() {
  const [profileImage, setProfileImage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loadProfile = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const userRef = doc(db, "Profile", user.email);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const data = userSnap.data();
        setProfileImage(data.image || "");
      }
    };

    loadProfile();
  }, []);

  const goHome = () => {
    navigate("/"); // Navigate to home
  };

  return (
    <div className="divheader">
      <div className="left" onClick={goHome}>
        <img src={icon} alt="Logo" className="header-logo" />
      </div>

      <div className="center">
        <h2 className="header-icon">Chatbot</h2>
      </div>

      <div className="right">
        <ProfileDropdown profileImage={profileImage} />
      </div>
    </div>
  );
}

export default Header;
