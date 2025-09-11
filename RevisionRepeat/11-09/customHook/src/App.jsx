import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import useThrottle from "../hooks/useThrottle";

function App() {
  const [input, setInput] = useState("");
  const throttledInput = useThrottle(input, 1000);

  return (
    <>
      <div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type..."
        />
        <div>
          <p>Original value:{input}</p>
          <p>Throttled value: {throttledInput}</p>
        </div>
      </div>
    </>
  );
}

export default App;
