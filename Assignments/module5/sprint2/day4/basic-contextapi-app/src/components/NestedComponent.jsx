import React from "react";
import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

function NestedComponent() {
  const theme = useContext(ThemeContext);
  const style = {
    backgroundColor: theme === "light" ? "#ffffff" : "#333333",
    color: theme === "light" ? "#000000" : "#ffffff",
    padding: "20px",
    borderRadius: "5px",
  };
  return (
    <div style={style}>
      <h2>This is a nested component</h2>
      <p>The current theme is : {theme}</p>
    </div>
  );
}

export default NestedComponent;
