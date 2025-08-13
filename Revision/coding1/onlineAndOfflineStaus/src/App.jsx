import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import OnlineStatus from "./components/OnlineStatus";

function App() {
  return (
    <>
      <OnlineStatus />
      <div>
        <h1>My App</h1>
        <p>Try disconnecting your internet to see the changes</p>
      </div>
    </>
  );
}

export default App;
