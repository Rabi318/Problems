import React, { useRef } from "react";

const FocusInput = () => {
  const inputRef = useRef(null);

  const focusInputFn = () => {
    inputRef.current.focus();
  };
  return (
    <div>
      <input ref={inputRef} type="text" placeholder="Type Something..." />
      <button onClick={focusInputFn}>Focus</button>
    </div>
  );
};

export default FocusInput;
