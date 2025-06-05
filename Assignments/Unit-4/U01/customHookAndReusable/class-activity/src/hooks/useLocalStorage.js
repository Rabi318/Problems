import { useState } from "react";

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialValue;
  });
  const setStoredValue = (newVal) => {
    setValue(newVal);
    localStorage.setItem(key, JSON.stringify(newVal));
  };
  return [value, setStoredValue];
}

export default useLocalStorage;
