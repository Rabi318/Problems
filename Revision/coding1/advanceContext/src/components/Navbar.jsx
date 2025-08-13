import { Link } from "react-router-dom";
import { useAuthState, useAuthActions } from "../context/AuthContext";
import { useTheme, useThemeActions } from "../context/ThemeContext";
import NotificationBell from "./NotificationBell";

export default function Navbar() {
  const { isAuthenticated, role, user } = useAuthState();
  const { logout } = useAuthActions();
  const theme = useTheme();
  const { toggleTheme } = useThemeActions();

  return (
    <nav
      style={{
        display: "flex",
        gap: 16,
        alignItems: "center",
        padding: "10px 16px",
        borderBottom: "1px solid #e5e5e5",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", gap: 12 }}>
        <Link to="/">Home</Link>
        {isAuthenticated && <Link to="/dashboard">Dashboard</Link>}
        {isAuthenticated && <Link to="/profile">Profile</Link>}
        {isAuthenticated && role === "admin" && <Link to="/users">Users</Link>}
      </div>

      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <NotificationBell />
        <button onClick={toggleTheme} aria-label="toggle theme">
          {theme === "light" ? "🌞" : "🌙"}
        </button>
        {isAuthenticated ? (
          <>
            <span style={{ fontSize: 12, opacity: 0.7 }}>
              {user?.first_name || user?.email} • {role}
            </span>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}
