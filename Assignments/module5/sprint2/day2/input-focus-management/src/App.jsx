import { useRef } from "react";

import "./App.css";

function App() {
  const inputRef = useRef(null);
  const handleFocus = () => {
    inputRef.current?.focus();
  };

  return (
    <>
      <div>
        <input type="text" ref={inputRef} placeholder="Type Something.." />
        <button onClick={handleFocus}>Focus Input</button>
      </div>
    </>
  );
}

export default App;
