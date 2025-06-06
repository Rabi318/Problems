import React from "react";
interface ButtonProps {
  label: string;
  type?: "button" | "submit";
}

const Button: React.FC<ButtonProps> = ({ label, type = "button" }) => {
  return (
    <div>
      <button type={type}>{label}</button>
    </div>
  );
};

export default Button;
