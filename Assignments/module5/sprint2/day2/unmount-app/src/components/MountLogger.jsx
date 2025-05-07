import React, { useEffect } from "react";

function MountLogger() {
  useEffect(() => {
    console.log("Component mounted");
    return () => {
      console.log("Component unmounted");
    };
  }, []);
  return <p>I am the component being toggled!</p>;
}

export default MountLogger;
