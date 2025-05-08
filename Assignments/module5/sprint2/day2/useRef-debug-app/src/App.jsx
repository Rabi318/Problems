import { useState, useRef } from "react";
import "./App.css";

function App() {
  const [time, setTime] = useState(10);
  const intervalId = useRef(null);
  const startTimer = () => {
    if (intervalId.current !== null) return;
    intervalId.current = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(intervalId.current);
          intervalId.current = null;
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };
  const stopTimer = () => {
    if (intervalId.current !== null) {
      clearInterval(intervalId.current);
      intervalId.current = null;
    }
  };
  const resetTimer = () => {
    stopTimer();
    setTime(10);
  };

  return (
    <>
      <h1>Time Left: {time}</h1>
      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>
      <button onClick={resetTimer}>Reset</button>
    </>
  );
}

export default App;
