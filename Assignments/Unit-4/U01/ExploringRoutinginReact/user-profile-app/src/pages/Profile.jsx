import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";

const Profile = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="max-w-md mx-auto border p-4 shadow">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>
      <p>
        <strong>Name</strong>
        {user.name}
      </p>
      <p>
        <strong>Email</strong>
        {user.email}
      </p>
    </div>
  );
};

export default Profile;
