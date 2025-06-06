import { use, useRef } from "react";
import "./App.css";

function App() {
  const inputsRef = useRef([]);
  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!/^[0-9]?$/.test(value)) return;
    e.target.value = value;
    if (value && index < 3) {
      inputsRef.current[index + 1].focus();
    }
  };
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };
  return (
    <>
      <div style={{ display: "flex", gap: "10px" }}>
        {[0, 1, 2, 3].map((_, index) => (
          <input
            key={index}
            type="text"
            maxLength={1}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            ref={(el) => (inputsRef.current[index] = el)}
            style={{
              width: "40px",
              height: "40px",
              fontSize: "24px",
              textAlign: "center",
            }}
          />
        ))}
      </div>
    </>
  );
}

export default App;
