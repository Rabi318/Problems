import React from "react";

const UserCard = ({ name, email, age }) => {
  return (
    <div className="p-4 border rounded shadow bg-white">
      <h2 className="text-lg font-semibold">{name}</h2>
      <p className="text-gray-600">{email}</p>
      <p className="text-gray-600">Age: {age}</p>
    </div>
  );
};

export default UserCard;
