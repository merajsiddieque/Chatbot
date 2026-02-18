# 🧠 Mental Health Chatbot

This project is a **Mental Health Support Chatbot** built using **React, Firebase, Express, OpenAI API, and MediaPipe**. It provides **empathetic conversations** and also supports **Sign Language input using real‑time hand gesture recognition**.

The chatbot helps users communicate their feelings through:

- 💬 Text chat
- ✋ Sign language gestures (MediaPipe)

This makes the chatbot more **accessible, inclusive, and interactive**.

---

# 🚀 GitHub Repository

https://github.com/merajsiddieque/Chatbot

---

# ✨ Features

## 🤖 AI Mental Health Chatbot

- Mental health support conversations
- Uses OpenAI API (GPT model) for generating intelligent replies
- Empathetic and human‑like replies
- Real‑time chat

---

## ✋ Sign Language Support (MediaPipe)

- Real‑time hand gesture detection using webcam
- Built using **MediaPipe Gesture Recognizer**
- Converts gestures into meaningful messages
- Sends gesture meaning to chatbot backend
- Bot replies based on interpreted gesture

### Supported Gestures

- Palm → Greeting
- Fist → Feeling stressed
- Thumb Up → Feeling okay
- Thumb Down → Feeling sad
- Victory → Feeling peaceful
- Pointing Up → Asking question
- I Love You → Appreciation
- Open Pinch → Minor concern
- Closed Pinch → Important message

---

## 🔐 Authentication

- Firebase Authentication
- Email and password login
- Secure user management

---

## 👤 Profile Management

- Update username
- Upload profile image
- Stored in Firebase Firestore

---

## ☁️ Backend API

- Express.js backend
- OpenAI API integration

Endpoint:

```
POST /chat
```

---

# 🛠️ Tech Stack

## Frontend

- React JS
- Tailwind CSS
- MediaPipe
- React Webcam

## Backend

- Node.js
- Express.js
- OpenAI API

## Database

- Firebase Firestore

## Authentication

- Firebase Auth

## AI & Vision

- OpenAI GPT (via OpenAI API key)
- MediaPipe Gesture Recognizer

---

# 📂 Project Structure

```
Chatbot
│
├── backend
│   └── server.js
│
├── react
│   ├── src
│   │   ├── components
│   │   │     SignInput.jsx
│   │   │     ChatbotSignMode.jsx
│   │   │
│   │   ├── pages
│   │   ├── firebase.js
│   │
│   └── dist
│
└── README.md
```

---

# ⚙️ Installation

## 1. Clone Repository

```bash
git clone https://github.com/merajsiddieque/Chatbot.git
```

## 2. Open Folder

```bash
cd Chatbot
```

---

## 3. Install Backend

```bash
npm install
```

---

## 4. Install Frontend

```bash
cd react
npm install
```

---

# 🔑 Environment Variables

Create `.env` file:

```
OPENAI_API_KEY=your_openai_api_key
```

This API key is used to connect with the **OpenAI API** to generate chatbot responses.

⚠️ Never expose your API key publicly.

---

# ▶️ Run Project

## Run Backend

```bash
node server.js
```

## Run Frontend

```bash
npm run dev
```

---

# 🔌 API

## POST /chat

Request:

```json
{
  "message": "I feel stressed"
}
```

Response:

```json
{
  "reply": "I'm here for you. Tell me what's bothering you."
}
```

---

# 🌟 Key Highlights

✅ Mental health support chatbot  
✅ Sign language support using MediaPipe  
✅ Real‑time gesture recognition  
✅ OpenAI integration  
✅ Firebase authentication  
✅ Full‑stack project  

---

# 🎯 Purpose

This project was built to learn:

- AI chatbot development
- OpenAI API
- Computer Vision using MediaPipe
- Full‑stack development
- Accessibility in AI systems

---

# 👨‍💻 Author

Siddique  

GitHub:  

https://github.com/merajsiddieque

---

# ⭐ Support

If you like this project, please give it a ⭐ on GitHub
