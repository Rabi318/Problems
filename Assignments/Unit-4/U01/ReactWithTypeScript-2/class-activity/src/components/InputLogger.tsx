import type React from "react";

const InputLogger = () => {
  const hanldeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  return (
    <div>
      <input
        type="text"
        onChange={hanldeInputChange}
        className="border p-2 mt-4 w-full"
      />
    </div>
  );
};

export default InputLogger;
