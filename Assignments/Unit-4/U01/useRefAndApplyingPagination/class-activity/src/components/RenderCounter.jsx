import React, { useEffect, useRef, useState } from "react";

const RenderCounter = () => {
  const [count, setCount] = useState(0);
  const renderCount = useRef(1);
  const prevCount = useRef(0);

  useEffect(() => {
    renderCount.current = renderCount.current + 1;
    prevCount.current = count;
  });
  return (
    <div>
      <h2>Counter: {count}</h2>
      <h3>Previous Count: {prevCount.current}</h3>
      <button onClick={() => setCount((prev) => prev + 1)}>Increment</button>
      <p>Component Re-rendered: {renderCount.current} times</p>
    </div>
  );
};

export default RenderCounter;
