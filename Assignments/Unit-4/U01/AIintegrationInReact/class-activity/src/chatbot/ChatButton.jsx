import React from "react";
import { CrossIcon, MessageSquare } from "lucide-react";
import { twMerge } from "tailwind-merge";

const ChatButton = ({ isOpen, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={twMerge(
        "fixed bottom-4 right-4 w-12 h-12 rounded-full shadow-lg ",
        "flex items-center justify-center transition-all duration-300",
        "hover:scale-110 active:scale-90",
        isOpen ? "bg-red-500" : "bg-blue-500"
      )}
    >
      {" "}
      {isOpen ? (
        <CrossIcon className="w-6 h-6 te" />
      ) : (
        <MessageSquare className="w-6 h-6" />
      )}
    </button>
  );
};

export default ChatButton;
