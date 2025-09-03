import React, { useState, useRef, useEffect } from "react";

const CountdownTimer = () => {
  const [time, setTime] = useState(""); // user input (seconds)
  const [remainingTime, setRemainingTime] = useState(0); // countdown
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);
  const audioRef = useRef(null);

  // Start timer
  const startTimer = () => {
    const seconds = parseInt(time, 10);
    if (isNaN(seconds) || seconds <= 0) return;

    // prime the audio (unlocks sound autoplay after user click)
    if (audioRef.current) {
      audioRef.current.load();
      audioRef.current.play().then(() => {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      });
    }

    setRemainingTime(seconds);
    setIsRunning(true);
    setIsPaused(false);

    intervalRef.current = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          setIsRunning(false);
          setIsPaused(false);
          if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const togglePause = () => {
    if (isPaused) {
      // Resume
      setIsPaused(false);
      intervalRef.current = setInterval(() => {
        setRemainingTime((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            setIsPaused(false);
            if (audioRef.current) {
              audioRef.current.play();
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      // Pause
      setIsPaused(true);
      clearInterval(intervalRef.current);
    }
  };

  // Reset timer
  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setIsPaused(false);
    setRemainingTime(0);
    setTime("");
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  // Progress percentage
  const progress =
    time && parseInt(time) > 0 ? (remainingTime / parseInt(time)) * 100 : 0;

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-md rounded-xl text-center space-y-4">
      <h2 className="text-2xl font-bold">⏳ Countdown Timer</h2>

      {/* Input */}
      <input
        type="number"
        placeholder="Enter seconds"
        value={time}
        disabled={isRunning}
        onChange={(e) => setTime(e.target.value)}
        className="border rounded p-2 w-full text-center"
      />

      {/* Display */}
      <div className="text-3xl font-mono">
        {remainingTime > 0 ? remainingTime : "0"}
      </div>

      {/* Progress Bar */}
      <div className="w-full h-3 bg-gray-200 rounded">
        <div
          className="h-3 bg-green-500 rounded transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-3">
        {!isRunning && (
          <button
            onClick={startTimer}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Start
          </button>
        )}

        {isRunning && (
          <button
            onClick={togglePause}
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            {isPaused ? "Resume" : "Pause"}
          </button>
        )}

        <button
          onClick={resetTimer}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Reset
        </button>
      </div>

      {/* Message */}
      {!isRunning && remainingTime === 0 && time !== "" && (
        <p className="text-red-600 font-semibold">⏰ Time’s up!</p>
      )}

      {/* Alarm Sound */}
      <audio ref={audioRef} src="music.wav" preload="auto" />
    </div>
  );
};

export default CountdownTimer;
