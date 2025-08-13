import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthActions } from "../context/AuthContext";

// Reqres test credentials that succeed:
// email: "eve.holt@reqres.in", password: "cityslicka"

export default function Login() {
  const [email, setEmail] = useState("eve.holt@reqres.in");
  const [password, setPassword] = useState("cityslicka");
  const [role, setRole] = useState("user"); // choose role at login (admin | user)
  const navigate = useNavigate();
  const { login } = useAuthActions();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (process.env.NODE_ENV === "development") {
        login({ email, token: "fake-dev-token" });
        navigate("/forecast");
        return;
      }
      const res = await fetch("https://reqres.in/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          password: password.trim(),
        }),
      });

      if (!res.ok) throw new Error("Login failed");
      const data = await res.json();

      const userRes = await fetch("https://reqres.in/api/users/2");
      const userData = await userRes.json();

      login({ token: data.token, user: userData.data, role });
      navigate("/dashboard");
    } catch {
      alert("Invalid credentials. Use eve.holt@reqres.in / cityslicka");
    }
  };

  return (
    <div style={{ maxWidth: 360, margin: "40px auto" }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="user">Regular User</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">Sign in</button>
      </form>
      <p style={{ fontSize: 12, opacity: 0.7, marginTop: 8 }}>
        Tip: Use email <code>eve.holt@reqres.in</code> & password{" "}
        <code>cityslicka</code>
      </p>
    </div>
  );
}
