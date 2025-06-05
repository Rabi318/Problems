import React, { useState } from "react";
import usePrevious from "../hooks/usePrevious";

const CounterWithPrev = () => {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);

  return (
    <div>
      <h1>Count With Prev Value</h1>
      <p>
        Now: {count} | Befor: {prevCount ?? "N/A"}
      </p>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
    </div>
  );
};

export default CounterWithPrev;
