import React from "react";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

function Home() {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <main>
      {isLoggedIn ? (
        <h2>You are Logged in! 🎉</h2>
      ) : (
        <h2>Please Login to access the content</h2>
      )}
    </main>
  );
}

export default Home;
