import React, { useState } from "react";

const Counter = ({ initialValue = 0 }) => {
  const [count, setCount] = useState(initialValue);
  const increment = () => {
    setCount(count + 1);
  };
  const decrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md w-64 mx-auto mt-10">
        <h1 className="text-2xl font-bold mb-4">Counter</h1>
        <div className="text-4xl font-mono mb-6">{count}</div>
        <div className="flex gap-6">
          <button
            onClick={decrement}
            disabled={count === 0}
            className={`px-4 py-2 rounded ${
              count === 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-red-500 text-white hover:bg-red-600"
            }`}
          >
            Decrement
          </button>
          <button
            onClick={increment}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Increment
          </button>
        </div>
      </div>
    </>
  );
};

export default Counter;
