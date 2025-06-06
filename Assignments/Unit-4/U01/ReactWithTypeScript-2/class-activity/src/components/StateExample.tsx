import { useState } from "react";

const StateExample = () => {
  const [name, setName] = useState<string>("");
  return (
    <div>
      <div>
        <h2>Name: {name}</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
    </div>
  );
};

export default StateExample;
