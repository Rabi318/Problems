import { useEffect, useState } from "react";

import "./App.css";

function App() {
  const [number, setNumber] = useState(0);

  useEffect(() => {
    console.log(`State updated: ${number}`);
  }, [number]);
  const generateRandomNumber = () => {
    const randomNum = Math.floor(Math.random() * 100);
    setNumber(randomNum);
  };
  return (
    <>
      <h1>Current Number: {number}</h1>
      <button onClick={generateRandomNumber}>Generate Random Number</button>
    </>
  );
}

export default App;
