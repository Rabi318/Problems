import { useEffect, useState } from "react";
import "./App.css";

function ThemeBox({ theme, children }) {
  const isDark = theme === "dark";
  return (
    <div
      className={`p-6 rounded-lg shadow-md transition-all duration-300 text-center ${
        isDark ? "bg-gray-800 text-white" : "bg-white text-gray-800"
      } `}
    >
      {children}
    </div>
  );
}

function App() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) setTheme(storedTheme);
  }, []);
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };
  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center gap-6 p-6 transition-all duration-300 ${
        theme === "dark" ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      <button
        onClick={toggleTheme}
        className={`px-5 py-2 rounded font-semibold transition
          ${
            theme === "dark"
              ? "bg-white text-gray-800"
              : "bg-gray-800 text-white"
          }`}
      >
        Toggle Theme
      </button>
      <div className="grid gird-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl">
        <ThemeBox theme={theme}>Box 1</ThemeBox>
        <ThemeBox theme={theme}>Box 2</ThemeBox>
        <ThemeBox theme={theme}>Box 3</ThemeBox>
      </div>
    </div>
  );
}

export default App;
