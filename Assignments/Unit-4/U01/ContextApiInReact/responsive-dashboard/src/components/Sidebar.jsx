import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";

function Sidebar() {
  const { isLoggedIn } = useAuth();
  const { theme } = useTheme();

  const bg = theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100";

  return (
    <aside
      className={`hidden md:block w-64 p-4 ${bg} h-full border-r border-gray-300`}
    >
      <h2 className="text-lg font-semibold mb-4">Sidebar</h2>
      {isLoggedIn && <p>Welcome back, user!</p>}
    </aside>
  );
}

export default Sidebar;
