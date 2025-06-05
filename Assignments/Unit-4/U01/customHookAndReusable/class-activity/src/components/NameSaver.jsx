import React from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const NameSaver = () => {
  const [name, setName] = useLocalStorage("name", "Guest");

  return (
    <div>
      <h1>Name Saver</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
      />
      <p>Your name is: {name}</p>
    </div>
  );
};

export default NameSaver;
