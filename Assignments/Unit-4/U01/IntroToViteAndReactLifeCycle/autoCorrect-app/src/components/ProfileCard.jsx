import React from "react";

const ProfileCard = ({
  name = "Anonymous User",
  age,
  bio = "No bio available",
}) => {
  const truncatedBio =
    bio.length > 100 ? bio.slice(0, 100) + "...Read More" : bio;
  return (
    <div className="max-w-sm mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{name}</h2>
      <p className="text-gary-600 mb-4">Age: {age}</p>
      <p className="text-gray-700 text-sm">{truncatedBio}</p>
    </div>
  );
};

export default ProfileCard;
