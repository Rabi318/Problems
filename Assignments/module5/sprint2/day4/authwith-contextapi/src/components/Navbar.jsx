import React from "react";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

function Navbar() {
  const { isLoggedIn, toggleAuth } = useContext(AuthContext);
  return (
    <nav style={{ padding: "20px", backgroundColor: "#eee" }}>
      <button onClick={toggleAuth}>{isLoggedIn ? "Logout" : "Login"}</button>
    </nav>
  );
}

export default Navbar;
