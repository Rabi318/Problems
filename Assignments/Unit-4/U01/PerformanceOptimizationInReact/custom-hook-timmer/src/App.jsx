import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import TimerComponent from "./components/TimerComponent";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <h1 style={{ textAlign: "center" }}>useTimer Custom Hook Demo</h1>
        <TimerComponent />
      </div>
    </>
  );
}

export default App;
