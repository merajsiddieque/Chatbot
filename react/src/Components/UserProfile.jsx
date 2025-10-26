import React, { useState, useEffect } from "react";
import "./UserProfile.css";
import { auth, db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

function UserProfile() {
  const [user, setUser] = useState({ name: "", email: "" });
  const [profileImage, setProfileImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  // Load user data from Firestore
  useEffect(() => {
    const loadUserData = async () => {
      const currentUser = auth.currentUser;
      if (!currentUser) return;

      const userRef = doc(db, "Profile", currentUser.email);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const data = userSnap.data();
        setUser({ name: data.name || "", email: data.email || "" });
        setPreviewImage(data.image || "");
      }
    };
    loadUserData();
  }, []);

  // Resize/compress image to keep it small (<150 KB)
  const resizeImage = (file, maxWidth = 200, maxHeight = 200) => {
    return new Promise((resolve) => {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = (e) => {
        img.src = e.target.result;
      };

      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        // Compress image to JPEG
        const dataUrl = canvas.toDataURL("image/jpeg", 0.7);
        resolve(dataUrl);
      };

      reader.readAsDataURL(file);
    });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const maxSizeMB = 1; // Firestore limit warning threshold
    if (file.size / 1024 / 1024 > maxSizeMB) {
      alert(`⚠️ File too large. Max allowed size is ${maxSizeMB} MB`);
      return;
    }

    const compressedDataUrl = await resizeImage(file);
    const dataSizeKB = Math.round((compressedDataUrl.length * 3) / 4 / 1024);
    if (dataSizeKB > 1024) {
      alert("⚠️ Compressed image is still too large for Firestore. Choose a smaller image.");
      return;
    }

    setProfileImage(compressedDataUrl);
    setPreviewImage(compressedDataUrl);
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const currentUser = auth.currentUser;
      if (!currentUser) return alert("User not logged in");
      if (!currentUser.emailVerified) return alert("Please verify your email to update profile");

      const userRef = doc(db, "Profile", currentUser.email);

      await setDoc(
        userRef,
        {
          name: user.name,
          image: profileImage || previewImage || "",
        },
        { merge: true }
      );

      alert("✅ Profile updated successfully!");
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Error updating profile: " + err.message);
    }
  };

  return (
    <main className="profile-container">
      <h1 className="profile-title">Edit Your Profile</h1>

      <form className="profile-form" onSubmit={handleSubmit}>
        <div className="profile-image-section">
          <div className="image-preview">
            {previewImage ? (
              <img src={previewImage} alt="Profile Preview" className="preview-img" />
            ) : (
              <div className="placeholder">No Image</div>
            )}
          </div>
          <label className="image-upload-btn">
            Upload Image
            <input type="file" accept="image/*" onChange={handleImageChange} hidden />
          </label>
        </div>

        <div className="form-group">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Email Address</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="form-input"
            disabled
          />
        </div>

        <button type="submit" className="submit-button">
          Save Profile
        </button>
      </form>
    </main>
  );
}

export default UserProfile;
