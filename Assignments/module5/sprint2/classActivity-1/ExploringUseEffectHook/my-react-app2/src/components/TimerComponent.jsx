import React from "react";
import { useEffect } from "react";
import { useState } from "react";

function TimerComponent() {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    console.log("Timer Started");
    const timer = setInterval(() => {
      setSeconds((seconds) => seconds + 1);
      console.log(`Seconds: ${seconds}`);
    }, 1000);
    return () => {
      clearInterval(timer);
      console.log("Timer Stopped");
    };
  }, []);
  return (
    <>
      <h1>Time: {seconds}s</h1>
    </>
  );
}

export default TimerComponent;
