import React, { useState } from "react";

const useClickMiddleware = (cllback, delay = 2000) => {
  const [lastClick, setLastClick] = useState(0);
  return () => {
    const now = Date.now();
    if (now - lastClick < delay) {
      console.log("Click blocked by middleware");
      return;
    }
    setLastClick(now);
    cllback();
  };
};

const ClickBtn = () => {
  const handleClick = useClickMiddleware(() => {
    console.log("Button Clicked");
  });
  return (
    <div>
      <button onClick={handleClick}>Click Me</button>
    </div>
  );
};

export default ClickBtn;
