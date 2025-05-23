import React from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import { useTheme } from "./contexts/ThemeContext";

function App() {
  const { theme } = useTheme();

  const bg =
    theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900";

  return (
    <div className={`flex flex-col min-h-screen ${bg}`}>
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {["Product 1", "Product 2", "Product 3", "Product 4"].map(
              (name) => (
                <div
                  key={name}
                  className={`p-6 rounded shadow ${
                    theme === "dark" ? "bg-gray-700" : "bg-gray-100"
                  }`}
                >
                  {name}
                </div>
              )
            )}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default App;
