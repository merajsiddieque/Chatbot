import React, { useState, useEffect, useRef } from "react";
import { doc, updateDoc, deleteDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { EllipsisVertical } from "lucide-react";

function List({ chat, isActive, onSelect, userEmail }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [newName, setNewName] = useState(chat.name || chat.chatId.slice(0, 10));
  const menuRef = useRef();

  // 🧩 Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 🟢 Rename chat
  const handleRename = async () => {
    if (!newName.trim()) return;
    try {
      const chatRef = doc(db, "Chats", userEmail, "chatList", chat.id);
      await updateDoc(chatRef, { name: newName });
      setIsRenaming(false);
      setMenuOpen(false);
    } catch (error) {
      console.error("Error renaming chat:", error);
    }
  };

  // 🔴 Delete chat + messages
  const handleDelete = async () => {
    if (!window.confirm("🗑️ Are you sure you want to delete this chat?")) return;
    try {
      // Delete all messages first
      const messagesRef = collection(db, "Chats", userEmail, "chatList", chat.chatId, "messages");
      const snapshot = await getDocs(messagesRef);
      await Promise.all(snapshot.docs.map((msg) => deleteDoc(msg.ref)));

      // Then delete the chat document itself
      const chatRef = doc(db, "Chats", userEmail, "chatList", chat.id);
      await deleteDoc(chatRef);

      console.log(`✅ Deleted chat ${chat.id} and its messages`);
    } catch (error) {
      console.error("Error deleting chat:", error);
    }
  };

  return (
    <div
      className={`flex items-center justify-between px-3 py-2 rounded-lg border border-indigo-100 cursor-pointer transition group ${
        isActive ? "bg-indigo-100 text-indigo-700 font-medium" : "bg-white hover:bg-indigo-50"
      }`}
      onClick={() => !isRenaming && onSelect(chat.chatId)}
    >
      {/* Editable chat name */}
      {isRenaming ? (
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onBlur={handleRename}
          onKeyDown={(e) => e.key === "Enter" && handleRename()}
          className="flex-1 bg-transparent border-none outline-none text-sm"
          autoFocus
        />
      ) : (
        <p className="truncate text-sm max-w-[8rem]">
          {chat.name || chat.chatId.slice(0, 10)}...
        </p>
      )}

      {/* ⋮ Menu */}
      <div className="relative" ref={menuRef}>
        <button
          className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-gray-100 transition"
          onClick={(e) => {
            e.stopPropagation();
            setMenuOpen(!menuOpen);
          }}
        >
          <EllipsisVertical size={16} />
        </button>

        {menuOpen && (
          <div className="absolute right-0 mt-1 w-32 bg-white shadow-lg rounded-lg border z-50">
            <button
              className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              onClick={(e) => {
                e.stopPropagation();
                setIsRenaming(true);
                setMenuOpen(false);
              }}
            >
              ✏️ Rename
            </button>
            <button
              className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
                setMenuOpen(false);
              }}
            >
              🗑️ Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default List;
