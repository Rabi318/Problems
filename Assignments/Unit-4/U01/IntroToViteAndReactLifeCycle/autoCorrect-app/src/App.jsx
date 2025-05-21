import { useState } from "react";
import "./App.css";
import AutoCorrect from "./components/AutoCorrect";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center gap-6">
      <AutoCorrect />
    </div>
  );
}

export default App;
