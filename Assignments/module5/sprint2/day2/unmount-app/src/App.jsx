import { useState } from "react";

import "./App.css";
import MountLogger from "./components/MountLogger";

function App() {
  const [visible, setVisible] = useState(true);

  return (
    <>
      <div>
        <button onClick={() => setVisible((prev) => !prev)}>
          Toggle component
        </button>
        <div>{visible && <MountLogger />}</div>
      </div>
    </>
  );
}

export default App;
