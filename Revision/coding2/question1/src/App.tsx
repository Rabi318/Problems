import { useState } from "react";

import "./App.css";
import DigitGroupInput from "./components/DigitGroupInput";

function App() {
  return (
    <>
      <div>
        <DigitGroupInput
          initialValue="123456"
          onChange={(raw) => console.log("Raw digits:", raw)}
        />
      </div>
    </>
  );
}

export default App;
