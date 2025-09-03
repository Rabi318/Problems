import { useEffect, useState, useContext } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import { AuthContext } from "../AuthContext";

const Profile = () => {
  const { user, setUser } = useContext(AuthContext); // 👈 use global AuthContext
  const [name, setName] = useState(user?.name || "");
  const [loading, setLoading] = useState(!user); // if no user, fetch from backend

  const fetchProfile = async () => {
    try {
      const res = await api.get("/users/me");
      setUser(res.data); // update context
      setName(res.data.name);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put("/users/me", { name });
      const updatedUser = res.data.user;

      // update global context + localStorage
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      alert("Profile updated successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update profile");
    }
  };

  useEffect(() => {
    if (!user) fetchProfile();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-md mx-auto bg-white shadow p-6 rounded mt-10">
        <h2 className="text-2xl font-bold mb-4">My Profile</h2>

        <form onSubmit={handleUpdate}>
          <label className="block mb-2 text-gray-700">Email</label>
          <input
            type="email"
            value={user.email}
            disabled
            className="w-full p-2 border rounded bg-gray-100 mb-4"
          />

          <label className="block mb-2 text-gray-700">Display Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded mb-4"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
