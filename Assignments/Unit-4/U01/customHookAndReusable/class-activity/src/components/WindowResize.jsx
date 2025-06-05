import React from "react";
import useWindowWidth from "../hooks/useWindowWidth";

const WindowResize = () => {
  const width = useWindowWidth();

  return (
    <div>
      <h1>Window Resize</h1>
      <p>Current screen width: {width}px</p>
    </div>
  );
};

export default WindowResize;
