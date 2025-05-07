import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import JokeCard from "./components/JokeCard";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="bg-gray-100 min-h-screen">
      <JokeCard />
    </div>
  );
}

export default App;
