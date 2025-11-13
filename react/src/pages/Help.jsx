import React from "react";

export default function Help() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-indigo-100 to-purple-100 text-gray-800 p-6">
      <div className="max-w-lg bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-indigo-600 mb-4">Help & Support 💡</h1>
        <p className="text-gray-600 leading-relaxed mb-4">
          If you’re facing issues using <strong>Chatbot</strong>, here are some tips:
        </p>
        <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
          <li>Check your internet connection.</li>
          <li>Try logging out and signing back in.</li>
          <li>For password reset, use the “Reset Password” option.</li>
          <li>Need further help? Contact merajsiddieque@gmail.com</li>
        </ul>

        <div className="border-t border-gray-200 pt-4 text-center">
          <p className="text-gray-700 font-medium mb-2">Developed by <span className="text-indigo-600 font-semibold">Meraj Alam Siddique</span></p>
          <p className="text-gray-600 text-sm">
            📧 Email:{" "}
            <a
              href="mailto:merajsiddieque@gmail.com"
              className="text-indigo-600 hover:underline"
            >
              merajsiddieque@gmail.com
            </a>
          </p>
          <p className="text-gray-600 text-sm mt-1">
            🔗 LinkedIn:{" "}
            <a
              href="https://www.linkedin.com/in/merajsiddieque?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:underline"
            >
              linkedin.com/in/merajsiddieque
            </a>
          </p>
          <p className="text-gray-600 text-sm mt-1">
            💻 GitHub:{" "}
            <a
              href="https://github.com/merajsiddieque"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:underline"
            >
              github.com/merajsiddieque
            </a>
          </p>
        </div>

        <button
          onClick={() => window.history.back()}
          className="mt-6 bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition w-full"
        >
          ← Back
        </button>
      </div>
    </div>
  );
}
