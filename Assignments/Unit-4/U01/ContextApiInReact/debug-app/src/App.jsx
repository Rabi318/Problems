import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { ThemeContext } from "./ThemeContext";

function App() {
  const { isLoggedIn, toggleAuth } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const isDark = theme === "dark";

  const containerClasses = isDark
    ? "bg-gray-900 text-white"
    : "bg-white text-gray-900";
  const navClasses = isDark ? "bg-gray-800" : "bg-gray-200";
  const cardClasses = isDark ? "bg-gray-800 text-white" : "bg-gray-100";
  const footerClasses = isDark ? "bg-gray-700 text-white" : "bg-gray-300";

  return (
    <div
      className={`min-h-screen ${containerClasses} transition-colors duration-300`}
    >
      {/* Navbar */}
      <nav className={`flex justify-between items-center p-4 ${navClasses}`}>
        <button
          onClick={toggleAuth}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          {isLoggedIn ? "Log Out" : "Log In"}
        </button>
        <button
          onClick={toggleTheme}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          Toggle to {isDark ? "Light" : "Dark"} Theme
        </button>
      </nav>

      {/* Main Grid */}
      <main className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {["Card 1", "Card 2", "Card 3"].map((card) => (
            <div key={card} className={`p-6 rounded shadow ${cardClasses}`}>
              {card}
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className={`p-4 text-center ${footerClasses}`}>
        Footer Content
      </footer>
    </div>
  );
}

export default App;
