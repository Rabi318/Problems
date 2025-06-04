// src/hooks/useToggleItems.js
import { useState } from "react";

function useToggleItems(initialValue = [], initialPosition = 0) {
  const [index, setIndex] = useState(
    initialPosition >= 0 && initialPosition < initialValue.length
      ? initialPosition
      : 0
  );

  const toggle = () => {
    setIndex((prevIndex) => (prevIndex + 1) % initialValue.length);
  };

  return [initialValue[index], toggle];
}

export default useToggleItems;
