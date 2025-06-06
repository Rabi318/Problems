import React from "react";
import ChatWindow from "./components/ChatWindow";
import ChatInput from "./components/ChatInput";
import { ChatProvider } from "./context/ChatContext";

const App: React.FC = () => {
  return (
    <ChatProvider>
      <div className="h-screen flex flex-col bg-gray-50">
        <header className="p-4 bg-blue-600 text-white text-lg font-bold">
          Gemini Chat
        </header>
        <ChatWindow />
        <ChatInput />
      </div>
    </ChatProvider>
  );
};

export default App;
