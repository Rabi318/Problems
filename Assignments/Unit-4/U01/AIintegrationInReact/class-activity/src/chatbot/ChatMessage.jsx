import { Bot } from "lucide-react";
import React from "react";
import ReactMarkDown from "react-markdown";

const ChatMessage = ({ message, isBot }) => {
  return (
    <div
      className={`rounded-xl p-3 ${
        isBot ? "bg-gray-700 shadow-md" : "bg-blue-500 text-white"
      }`}
    >
      {isBot && (
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 text-white flex items-center justify-center">
            <Bot size={14} />
          </div>
        </div>
      )}
      <div className={`overflow-hidden text-sm ${isBot ? "ml-8" : ""}`}>
        <ReactMarkDown>{message}</ReactMarkDown>
      </div>
    </div>
  );
};

export default ChatMessage;
