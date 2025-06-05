import { useState, useEffect } from "react";

function useDebounce(value, delay = 500) {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timmer = setTimeout(() => {
      setDebounceValue(value);
    }, delay);
    return () => clearTimeout(timmer);
  }, [value, delay]);

  return debounceValue;
}

export default useDebounce;
