import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import TaskList from "./components/TaskList";
import TaskInput from "./components/TaskInput";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Task List App</h1>
      <TaskInput />
      <TaskList />
    </>
  );
}

export default App;
