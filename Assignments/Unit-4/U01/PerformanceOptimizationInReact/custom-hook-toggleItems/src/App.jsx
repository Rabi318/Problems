import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import useToggleItems from "./hooks/useToggleItems";

function App() {
  const [currentItem, toggleItem] = useToggleItems(["A", "B", "C"], 1);

  return (
    <>
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <h1>🔁 Toggle Items Custom Hook</h1>
        <h2>Current Item: {currentItem}</h2>
        <button onClick={toggleItem}>Toggle</button>
      </div>
    </>
  );
}

export default App;
