import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useMemo } from "react";

function SlowDouble({ number }) {
  const slowFun = (num) => {
    console.log("Operation is started...");
    for (let i = 0; i < 1e9; i++) {}
    console.log("Operation is completed...");
    return num * 2;
  };
  const result = useMemo(() => slowFun(number), [number]);
  return (
    <>
      <div>
        <p>Result: {result}</p>
      </div>
    </>
  );
}

function App() {
  const [number, setNumber] = useState(1);
  const [color, setColor] = useState(true);

  const toggleColor = () => {
    setColor((prev) => !prev);
  };

  return (
    <>
      <div style={{ backgroundColor: color ? "red" : "green" }}>
        <h2>Slow Calculation without useMemo</h2>
        <input
          type="number"
          value={number}
          onChange={(e) => setNumber(Number(e.target.value))}
        />
        <button onClick={toggleColor}>Toggle Color</button>
        <SlowDouble number={number} />
      </div>
    </>
  );
}

export default App;
