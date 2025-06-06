import { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState<number>(0);

  const handleIncrement = () => {
    setCount(count + 1);
  };
  return (
    <div>
      <h1>Count: {count}</h1>
      <button
        onClick={handleIncrement}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 "
      >
        Increment
      </button>
    </div>
  );
};

export default Counter;
