import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import FocusInput from "./components/FocusInput";
import RenderCounter from "./components/RenderCounter";
import QueryBasePagination from "./components/QueryBasePagination";
import NonQueryBasePagination from "./components/NonQueryBasePagination";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* <FocusInput />
      <RenderCounter /> */}
      {/* <QueryBasePagination /> */}
      <NonQueryBasePagination />
    </>
  );
}

export default App;
