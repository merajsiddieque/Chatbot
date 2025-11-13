import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function Profile() {
  const user = auth.currentUser;
  const [userName, setUserName] = useState("");
  const [photo, setPhoto] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const email = user?.email;

  // 🟢 Fetch Profile Data from Firestore
  useEffect(() => {
    const fetchProfile = async () => {
      if (!email) return;
      try {
        const docRef = doc(db, "Profile", email);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setUserName(data.userName || "");
          setPhoto(data.photo || "");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [email]);

  // 🟣 Handle Image Upload (convert to Base64 with 1MB total limit)
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check original file size first (before converting)
    if (file.size > 1024 * 1024) {
      alert("⚠️ File too large. Please choose an image under 1 MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;

      // Compute approximate Base64 size in MB
      const base64SizeMB = (base64String.length * 3) / 4 / 1024 / 1024;
      if (base64SizeMB > 1) {
        alert(
          "⚠️ Converted image exceeds 1 MB after encoding. Please choose a smaller image."
        );
        return;
      }

      setPhoto(base64String); // ✅ Safe Base64 string
    };
    reader.readAsDataURL(file);
  };

  // 🟣 Save Profile to Firestore
  const handleSaveProfile = async () => {
    if (!email) return;

    try {
      const safeEmail = email.replace(/\//g, "_");
      const docRef = doc(db, "Profile", safeEmail);

      // 🟢 Fetch existing data first
      const existingDoc = await getDoc(docRef);
      const existingData = existingDoc.exists() ? existingDoc.data() : {};

      // 🟣 Use the old photo if new one is not uploaded
      const finalPhoto = photo || existingData.photo || "";

      // 🟣 Prepare updated data
      const updatedData = {
        userName: userName || existingData.userName || "",
        photo: finalPhoto,
        emailid: email,
      };

      // 🟢 Save with merge (to keep other fields)
      await setDoc(docRef, updatedData, { merge: true });

      setMessage("✅ Profile saved successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("Error saving profile:", error);
      setMessage("❌ Failed to save profile: " + error.message);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600 text-lg">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-indigo-100 to-white text-gray-800">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-[90%] max-w-md text-center border border-indigo-100">
        <h1 className="text-2xl font-bold text-indigo-600 mb-6">My Profile</h1>

        {/* Profile Image */}
        <div className="relative w-32 h-32 mx-auto mb-4">
          <img
            src={
              photo || "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt="Profile"
            className="w-32 h-32 object-cover rounded-full border-4 border-indigo-300 shadow-sm"
          />
          <label
            htmlFor="photoUpload"
            className="absolute bottom-0 right-0 bg-indigo-500 hover:bg-indigo-600 text-white p-2 rounded-full cursor-pointer shadow-md transition"
            title="Change Photo"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.232 5.232l3.536 3.536M9 11l6.232-6.232a2.828 2.828 0 114 4L13 15l-4 1 1-4z"
              />
            </svg>
          </label>
          <input
            id="photoUpload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        </div>

        {/* Username Field */}
        <div className="mb-4 text-left">
          <label className="block text-gray-700 mb-1 font-medium">
            Username
          </label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter your name"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* Email Field (readonly) */}
        <div className="mb-6 text-left">
          <label className="block text-gray-700 mb-1 font-medium">
            Email ID
          </label>
          <input
            type="text"
            value={email}
            disabled
            className="w-full px-4 py-2 border rounded-lg bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Save Button */}
        <button
          onClick={handleSaveProfile}
          className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 rounded-xl shadow-md transition-all duration-200 transform hover:scale-[1.03] hover:shadow-lg active:scale-95"
        >
          Save Profile
        </button>

        {message && (
          <p className="text-sm text-green-600 mt-3 font-medium">{message}</p>
        )}

        {/* Back Button */}
        <button
          onClick={() => window.history.back()}
          className="mt-4 text-indigo-600 hover:underline text-sm"
        >
          ← Back to Chat
        </button>
      </div>
    </div>
  );
}
