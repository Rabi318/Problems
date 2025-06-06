import axios from "axios";
import type { Message } from "../context/ChatContext";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

console.log(API_KEY);

// const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent`;

export const fetchGeminiResponse = async (messages: Message[]) => {
  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
      {
        contents: messages.map((m) => ({
          role: m.role,
          parts: [{ text: m.text }],
        })),
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const candidate = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
    return candidate || "[No response]";
  } catch (err: any) {
    console.error("Gemini API Error:", err.response?.data || err.message);
    throw new Error("Failed to connect to Gemini API.");
  }
};
