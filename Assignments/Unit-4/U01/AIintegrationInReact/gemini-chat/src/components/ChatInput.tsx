import React, { useState } from "react";
import { useChat, type Message } from "../context/ChatContext";
import { fetchGeminiResponse } from "../api/gemini";

const ChatInput: React.FC = () => {
  const { messages, addMessage } = useChat();
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      role: "user",
      text: input,
      timestamp: new Date().toISOString(),
    };
    addMessage(userMsg);
    setInput("");
    setLoading(true);
    setError("");

    try {
      const aiText = await fetchGeminiResponse([...messages, userMsg]);
      const aiMsg: Message = {
        role: "assistant",
        text: aiText,
        timestamp: new Date().toISOString(),
      };
      addMessage(aiMsg);
    } catch (err) {
      setError("Failed to connect to Gemini API.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage();
  };

  return (
    <form onSubmit={handleSubmit} className="flex p-4 gap-2 border-t">
      <input
        className="flex-1 border border-gray-300 px-4 py-2 rounded"
        placeholder="Type a message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={loading}
        aria-label="Message input"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "..." : "Send"}
      </button>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </form>
  );
};

export default ChatInput;
