import React, { useRef, useState } from "react";

function FocusInput() {
  const inputRef = useRef(null);
  const [focused, setFocused] = useState(false);

  const handleFocus = () => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.style.backgroundColor = "yellow";
      setFocused(true);
    }
  };
  return (
    <div className="p-6 max-w-md mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4">Focus Input Example</h1>

      <input
        ref={inputRef}
        type="text"
        className="w-full px-4 py-2 border rounded mb-4 transition"
        placeholder="Click the button to focus"
      />

      <button
        onClick={handleFocus}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Focus the Input
      </button>

      {focused && <p className="mt-4 text-green-600 font-medium">Focused!</p>}
    </div>
  );
}

export default FocusInput;
