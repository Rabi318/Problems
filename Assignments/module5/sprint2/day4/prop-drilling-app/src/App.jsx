import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Child from "./components/Child";

function App() {
  const [name, setName] = useState("");
  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  return (
    <>
      <div>
        <h1>Props Drilling Example</h1>
        <input
          type="text"
          placeholder="Enter you name"
          value={name}
          onChange={handleNameChange}
        />
        <Child name={name} />
      </div>
    </>
  );
}

export default App;
