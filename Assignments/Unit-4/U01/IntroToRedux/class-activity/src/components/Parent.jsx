import React, { useState } from "react";

const Parent = () => {
  const [count, setCount] = useState(0);
  return <Child count={count} setCount={setCount} />;
};

function Child({ count, setCount }) {
  return (
    <>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Incr</button>
    </>
  );
}

export default Parent;
