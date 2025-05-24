import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";

const Settings = () => {
  const { user, setUser } = useContext(UserContext);
  const [formData, setFormData] = useState({ name: "", email: "" });

  useEffect(() => {
    setFormData(user);
  }, [user]);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser(formData);
    alert("Profile updated!");
  };
  return (
    <div className="max-w-md mx-auto border p-4 shadow">
      <h2 className="text-2xl font-bold mb-4">Settings</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Name:</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            type="text"
          />
        </div>
        <div>
          <label className="block font-medium">Email:</label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            type="email"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default Settings;
