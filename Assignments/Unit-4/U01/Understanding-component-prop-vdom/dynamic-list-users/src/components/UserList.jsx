import React, { useState } from "react";
import UserCard from "./UserCard";

const UserList = ({ initialUsers = [] }) => {
  const [users, setUsers] = useState(initialUsers);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
  });
  const [errors, setErrors] = useState({});
  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = "Name is required";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errs.email = "Email is invalid";
    }
    const ageVal = parseInt(formData.age);

    if (isNaN(ageVal) || ageVal <= 0) {
      errs.age = "Age must be a positive number";
    }
    return errs;
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleAddUser = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const newUser = {
      name: formData.name,
      email: formData.email,
      age: parseInt(formData.age),
    };
    setUsers((prev) => [...prev, newUser]);
    setFormData({
      name: "",
      email: "",
      age: "",
    });
    setErrors({});
  };
  return (
    <div className="max-w-2xl mx-auto p-4">
      <form onSubmit={handleAddUser} className="mb-6 space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium">
            Name
          </label>
          <input
            type="text"
            className="w-full mt-1 p-2 border rounded"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errrors.name}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            className="w-full mt-1 p-2 border rounded"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium">Age</label>
          <input
            className="w-full mt-1 p-2 border rounded"
            name="age"
            type="number"
            value={formData.age}
            onChange={handleChange}
          />
          {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add User
        </button>
      </form>
      {users.length === 0 ? (
        <p className="text-gray-600 text-center">No Users Added Yet</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {users.map((user, index) => (
            <UserCard key={index} {...user} />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserList;
