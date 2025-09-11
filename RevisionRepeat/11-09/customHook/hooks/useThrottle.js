import React, { useEffect, useRef, useState } from "react";

function useThrottle(value, delay) {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastExecuted = useRef(Date.now());

  useEffect(() => {
    const handler = setTimeout(() => {
      const now = Date.now();
      if (now - lastExecuted.current >= delay) {
        setThrottledValue(value);
        lastExecuted.current = now;
      }
    }, delay - (Date.now() - lastExecuted.current));
    return () => clearTimeout(handler);
  }, [value, delay]);
  return throttledValue;
}

export default useThrottle;
