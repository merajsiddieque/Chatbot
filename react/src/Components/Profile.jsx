import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase"; // import your firebase auth
import { signOut } from "firebase/auth";
import "./Profile.css";
import defaultProfile from "../assets/user-icon.jpg"; // fallback image

function Profile({ profileImage }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleLogout = async () => {
    try {
      await signOut(auth); // Firebase logout
      navigate("/"); // redirect to homepage or login
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="profile-dropdown-container" ref={dropdownRef}>
      <img
        src={profileImage || defaultProfile}
        alt="Profile"
        className="header-profile"
        onClick={toggleDropdown}
      />

      {isOpen && (
        <div className="dropdown-menu">
          <ul>
            <li>
              <Link to="/profile" className="dropdown-item">
                Profile
              </Link>
            </li>
            <li>
              <Link to="/reset-password" className="dropdown-item">
                Reset Password
              </Link>
            </li>
            <li>
              <Link to="/delete-account" className="dropdown-item">
                Delete Account
              </Link>
            </li>

            <li>
              <span onClick={handleLogout} className="dropdown-item">
                Logout
              </span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Profile;
