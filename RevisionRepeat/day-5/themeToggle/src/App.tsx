import "./App.css";
import { useTheme } from "./hooks/useTheme";

function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: theme === "light" ? "#ffffff" : "#1a1a1a",
          color: theme === "light" ? "#000000" : "#f5f5f5",
          transition: "all 0.3s ease",
        }}
      >
        <h1>Theme Toggle</h1>
        <p>
          Current Theme: <strong>{theme}</strong>
        </p>
        <button
          onClick={toggleTheme}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
            background: theme === "light" ? "#000" : "#fff",
            color: theme === "light" ? "#fff" : "#000",
          }}
        >
          Toggle Theme
        </button>
      </div>
    </>
  );
}

export default App;
