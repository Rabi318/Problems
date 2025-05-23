import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { ThemeProvider } from "./components/ThemeContext";
import NestedComponent from "./components/NestedComponent";

function App() {
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <>
      <ThemeProvider value={theme}>
        <div>
          <h1>Basic Context API</h1>
          <button onClick={toggleTheme}>Toggle Theme (Current:{theme})</button>
          <NestedComponent />
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
