import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { NotificationProvider } from "./context/NotificationContext";
import PrivateRoute from "./routes/PrivateRoute";
import AdminRoute from "./routes/AdminRoute";
import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Users from "./pages/Users";

function ThemedContainer({ children }) {
  const theme = useTheme();
  return (
    <div
      style={{
        minHeight: "100vh",
        background: theme === "light" ? "#fff" : "#0f172a",
        color: theme === "light" ? "#111827" : "#e5e7eb",
      }}
    >
      {children}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <NotificationProvider>
          <BrowserRouter>
            <ThemedContainer>
              <Navbar />
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />

                <Route element={<PrivateRoute />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/profile" element={<Profile />} />
                </Route>

                <Route element={<AdminRoute />}>
                  <Route path="/users" element={<Users />} />
                </Route>

                <Route
                  path="*"
                  element={<div style={{ padding: 16 }}>Not Found</div>}
                />
              </Routes>
            </ThemedContainer>
          </BrowserRouter>
        </NotificationProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
