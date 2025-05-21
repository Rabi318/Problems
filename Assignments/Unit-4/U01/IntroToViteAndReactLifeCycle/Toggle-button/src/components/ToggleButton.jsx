import React, { useState } from "react";

const ToggleButton = ({ label = "" }) => {
  const [isOn, setIsOn] = useState(false);
  const toggle = () => setIsOn(!isOn);
  return (
    <div className="flex item-center gap-4 p-4 bg-white shadow rounded w-fit mx-auto mt-10">
      {label && <span className="text-gray-600 font-medium">{label}</span>}
      <button
        onClick={toggle}
        className={`px-6 py-2 rounded font-bold text-white transition-colors duration-200
          ${
            isOn
              ? "bg-green-500 hover:bg-green-600"
              : "bg-red-500 hover:bg-red-600"
          }`}
      >
        {isOn ? "ON" : "OFF"}
      </button>
    </div>
  );
};

export default ToggleButton;
