import { useState } from "react";
import "./App.css";
import ToggleButton from "./components/ToggleButton";

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <ToggleButton label="Power" />
    </div>
  );
}

export default App;
