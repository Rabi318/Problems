import React from "react";
import Child from "./Child";

function Middle({ msg }) {
  return (
    <>
      <h2>I am Middle Component</h2>
      <p>Below is a child component</p>
      <Child msg={msg} />
    </>
  );
}

export default Middle;
