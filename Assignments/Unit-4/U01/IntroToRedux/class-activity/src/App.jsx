import { useState } from "react";
import "./App.css";
import { Counter } from "./components/Counter";
import Auth from "./components/Auth";

function App() {
  return (
    <>
      <Auth />
      <Counter />
    </>
  );
}

export default App;
