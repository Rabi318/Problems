import { GoogleGenAI } from "@google/genai";
import { Maximize2, Minimize2, Send, Sparkle, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ChatMessage from "./ChatMessage";

const apiKey = process.env.REACT_APP_GOOGLE_GENAI_API_KEY;

const genAI = new GoogleGenAI({
  apiKey: apiKey,
});

const ChatWindow = ({ isOpen, onClose }) => {
  const [userName, setUserName] = useState("Guest");
  const [userInitial, setUserInitial] = useState("G");
  const [message, setMessage] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const chatWindowRef = useRef(null);
  const messageEndRef = useRef(null);
  const inputRef = useRef(null);

  //this will run when users opens the chat window
  useEffect(() => {
    const fetchUserData = () => {
      const userDetails = JSON.parse(
        localStorage.getItem("name") || '{"name": "Guest"}'
      );
      setUserName(userDetails?.name || "Guest");
      setUserInitial((userDetails.name || "Guest").charAt(0).toUpperCase());
      setMessage([
        {
          text: `Hii ${
            userDetails.name || "Guest"
          }, I am your AI assistant. How can I help you today?`,
          isBot: true,
        },
      ]);
    };

    if (isOpen) {
      fetchUserData();
    }
  }, [isOpen]);

  //this useeffect closing out the popup
  useEffect(() => {
    const handleClickOutSide = (e) => {
      if (chatWindowRef.current && !chatWindowRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutSide);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, [isOpen, onClose]);

  //this will help us to scroll to the message
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) {
      return;
    }
    const userMessage = input.trim();
    setInput("");
    setMessage((prev) => [...prev, { text: userMessage, isBot: false }]);
    setIsLoading(true);
    try {
      const result = await genAI.models.generateContent({
        model: "gemini-2.0-flash",
        contents: userMessage,
      });
      const reply = result.text;
      setMessage((prev) => [...prev, { text: reply, isBot: true }]);
    } catch (error) {
      console.error(error);
      setMessage((prev) => [
        ...prev,
        { text: "Something went wrong", isBot: true },
      ]);
    } finally {
      setIsLoading(false);
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // prevent newline
      handleSubmit(e);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      ref={chatWindowRef}
      className="fixed bottom-20 right-4 w-80 h-96 bg-gray-900 rounded-lg shadow-lg border-gray-700 overflow-hidden transition-all duration-300 transform ease-in-out "
    >
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-3 flex items-center justify-center text-white">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
            <Sparkle className="text-white " size={18} />
          </div>
          <div>
            <h3 className="font-medium text-sm text-white">AI Assistant</h3>
            <p>
              Welcome,{" "}
              {userName.length > 15 ? userName.slice(0, 15) + "..." : userName}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            className="p-1.5 hover:bg-white/10 rounded-full transition-color"
            onClick={() => setIsMinimized(!isMinimized)}
          >
            {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
          </button>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-white/10 rounded-full transition-color"
          >
            {" "}
            <X size={16} />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          <div className="h-[calc(100%-8rem)] overflow-y-auto p-3 space-y-3 bg-gray-800">
            {message.map((message, index) => (
              <div key={index} className="flex items-start gap-2 text-white">
                {message.isBot ? (
                  <ChatMessage message={message.text} isBot={true} />
                ) : (
                  <div className="flex items-start gap-2 jsutify-end w-full text-white">
                    <div className="flex-1">
                      <ChatMessage message={message.text} isBot={false} />
                    </div>
                    <div className="w-6 h-6 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center flex-shrink-0 text-xs">
                      {userInitial}
                    </div>
                  </div>
                )}
              </div>
            ))}
            {isLoading && <p>loding...</p>}
            <div ref={messageEndRef}></div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="relative">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
                style={{ maxHeight: "100px" }}
                placeholder="Type something..."
                className="w-full pr-10 pl-3 py-2 rounded-xl text-white border border-gray-200 bg-gray-700 resize-none"
              />

              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="absolute bottom-2 right-3 p-1 hover:bg-white/10 rounded-full transition-colors text-white"
              >
                <Send size={16} />
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default ChatWindow;
