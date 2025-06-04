// src/components/TimerComponent.js
import React from "react";
import useTimer from "../hook/useTimer";

const TimerComponent = () => {
  const { timer, isRunning, startTimer, stopTimer, resetTimer } = useTimer();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>⏱ Timer: {timer} sec</h2>
      <p>Status: {isRunning ? "Running" : "Stopped"}</p>
      <button onClick={startTimer} style={{ marginRight: "10px" }}>
        Start
      </button>
      <button onClick={stopTimer} style={{ marginRight: "10px" }}>
        Stop
      </button>
      <button onClick={resetTimer}>Reset</button>
    </div>
  );
};

export default TimerComponent;
