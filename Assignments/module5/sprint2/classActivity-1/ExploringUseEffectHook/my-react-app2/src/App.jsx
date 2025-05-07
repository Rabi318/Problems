import { useState } from "react";
import "./App.css";
import { useEffect } from "react";
import FetchData from "./components/FetchData";
import TimerComponent from "./components/TimerComponent";
import { use } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("Tommy");
  useEffect(() => {
    console.log("Component mounted and updated");
  }, [count, name]);
  const [show, setShow] = useState(false);
  return (
    <>
      {/* <h1>Count: {count}</h1>
      <h2>Name: {name}</h2>
      <button onClick={() => setCount(count + 1)}>Increase</button>
      <button onClick={() => setName("Moti")}>Change Name</button> */}

      {/* <FetchData /> */}

      {show && <TimerComponent />}
      <button onClick={() => setShow(!show)}>Toggle Timer</button>
    </>
  );
}

export default App;
