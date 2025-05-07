import React from "react";

function Child({ msg }) {
  return (
    <>
      <div>I am a child component</div>
      <h4>Got this from parent {msg}</h4>
    </>
  );
}

export default Child;
