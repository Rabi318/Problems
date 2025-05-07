import { useState, useEffect } from "react";

import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log(`Counter value: ${count}`);
  }, [count]);

  return (
    <>
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="max-w-sm mx-auto mt-20 p-6 bg-white shadow-md rounded text-center">
          <h2 className="text-2xl font-bold mb-4">Counter: {count}</h2>
          <div className="flex justify-center gap-4 mb-4">
            <button
              onClick={() => setCount(count + 1)}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Increment
            </button>
            <button
              onClick={() => setCount(count - 1)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Decrement
            </button>
          </div>
          <button
            onClick={() => setCount(0)}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Reset
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
