import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import TodoApp1 from "./components/TodoApp1";
import TodoApp2 from "./components/TodoApp2";
import FetchData from "./components/FetchData";
import Form from "./components/Form";

function App() {
  return (
    <>
      <h1>Rabi</h1>
      {/* <TodoApp1 /> */}
      {/* <TodoApp2 /> */}
      {/* <FetchData /> */}
      <Form />
    </>
  );
}

export default App;
