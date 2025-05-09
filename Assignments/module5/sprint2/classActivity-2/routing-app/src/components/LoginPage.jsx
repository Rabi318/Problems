import React from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const handleLogin = () => {
    alert("Login success");
    navigate("/home");
  };
  return (
    <>
      <h3>LoginPage</h3>
      <button onClick={handleLogin}>Login</button>
    </>
  );
}

export default LoginPage;
