import React, { use, useEffect, useRef, useState } from "react";

const App = () => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [targetTime, setTargetTime] = useState(0);
  const soundPlayedRef = useRef(false);

  const audioRef = useRef(
    new Audio(
      "https://assets.mixkit.co/sfx/preview/mixkit-bell-notification-933.mp3"
    )
  );

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    if (seconds === targetTime && !soundPlayedRef.current) {
      audioRef.current.play().catch((err) => console.log(err));
      soundPlayedRef.current = true;
    }
  }, [seconds, targetTime]);

  const start = () => {
    setIsRunning(true);
    soundPlayedRef.current = false;
    if (audioRef.current) {
      audioRef.current.load();
    }
  };

  const stop = () => setIsRunning(false);

  const reset = () => {
    setSeconds(0);
    setIsRunning(false);
    soundPlayedRef.current = false;
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-6 rounded shadow-md text-center w-full max-w-sm">
        <h1 className="text-3xl font-bold mb-4">React Stopwatch</h1>
        <p className="text-5xl font-mono mb-4">{seconds}</p>
        <div className="flex justify-center gap-2 mb-4">
          <button
            onClick={start}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Start
          </button>
          <button
            onClick={stop}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            Stop
          </button>
          <button
            onClick={reset}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Reset
          </button>
        </div>
        <div>
          <label className="block mb-2 font-medium">
            🎯 Target Time (seconds)
          </label>
          <input
            type="number"
            min="1"
            value={targetTime}
            onChange={(e) => setTargetTime(Number(e.target.value))}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
      </div>
    </div>
  );
};

export default App;
