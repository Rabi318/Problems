import React from "react";
import Right from "./Right";

function Child({ name }) {
  return (
    <div>
      <h2>Child Components</h2>
      <Right name={name} />
    </div>
  );
}

export default Child;
