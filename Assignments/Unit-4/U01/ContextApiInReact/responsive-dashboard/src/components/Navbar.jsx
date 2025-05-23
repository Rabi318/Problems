import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";

function Navbar() {
  const { isLoggedIn, toggleAuth } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const bg = theme === "dark" ? "bg-gray-800" : "bg-gray-100";

  return (
    <nav className={`flex justify-between items-center p-4 shadow ${bg}`}>
      <span className="font-semibold">
        {isLoggedIn ? "Logged In" : "Logged Out"}
      </span>
      <div className="flex gap-2">
        <button
          onClick={toggleAuth}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Toggle Login
        </button>
        <button
          onClick={toggleTheme}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Toggle Theme
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
