import React from "react";
import { useTheme } from "../contexts/ThemeContext";

function Footer() {
  const { theme } = useTheme();
  const bg = theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-200";

  return (
    <footer className={`p-4 text-center ${bg} mt-auto`}>
      © 2025 Dashboard App
    </footer>
  );
}

export default Footer;
