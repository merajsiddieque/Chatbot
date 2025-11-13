import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import OpenAI from "openai";

dotenv.config(); // Load .env

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Initialize OpenAI using .env key
if (!process.env.OPENAI_API_KEY) {
  console.error("❌ OPENAI_API_KEY not found in environment!");
  process.exit(1);
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

console.log("✅ OpenAI initialized using .env key");

// ✅ Health Check
app.get("/api", (req, res) => {
  res.send("🧠 Sahaara AI API is running successfully!");
});

// ✅ Chat Endpoint
app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
You are a mental health support chatbot named "Sahaara AI".
Your tone is empathetic, calm, and supportive.
Respond in short, simple sentences (1–3 lines max).
Use kind and understanding words.
If the user sounds sad or anxious, comfort them gently.
Avoid robotic or formal tone.`,
        },
        { role: "user", content: message },
      ],
      max_tokens: 120,
      temperature: 0.7,
    });

    const reply =
      response.choices?.[0]?.message?.content?.trim() ||
      "I'm here for you. Can you tell me more about what’s going on?";

    res.json({ reply });
  } catch (error) {
    console.error("❌ Chat API Error:", error.message);
    res.status(500).json({
      error: "Failed to get response",
      details: error.message,
    });
  }
});

// ✅ Serve React frontend (for Render)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "../react/dist")));
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../react/dist/index.html"));
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
