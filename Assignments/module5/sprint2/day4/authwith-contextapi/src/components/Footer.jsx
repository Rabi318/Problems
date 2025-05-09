import React from "react";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

function Footer() {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <footer style={{ padding: "10px", background: "#ddd" }}>
      {isLoggedIn ? (
        <p style={{ color: "green" }}>Welcome, User</p>
      ) : (
        <p style={{ color: "red" }}>Please log in</p>
      )}
    </footer>
  );
}

export default Footer;
