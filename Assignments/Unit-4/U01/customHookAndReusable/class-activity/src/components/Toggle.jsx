import React from "react";
import useToggle from "../hooks/useToggle";

const Toggle = () => {
  const [isVisible, toggleVisible] = useToggle(true);

  return (
    <>
      <div>Toggle</div>
      <button onClick={toggleVisible}>Toggle</button>
      {isVisible && <p>Visible</p>}
    </>
  );
};

export default Toggle;
