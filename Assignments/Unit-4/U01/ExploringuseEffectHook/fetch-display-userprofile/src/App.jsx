import { useEffect, useState } from "react";
import "./App.css";

const UserCard = ({ name, email, city }) => {
  return (
    <div className="bg-white p-4 rounded shadow-md border">
      <h2 className="text-xl font-bold ">{name}</h2>
      <p className="text-gray-600">{email}</p>
      <p className="text-gray-500">City: {city}</p>
    </div>
  );
};
function App() {
  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const fethcUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      if (!res.ok) {
        throw new Error("something went wrong");
      }
      const data = await res.json();
      setUsers(data);
      setFiltered(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fethcUsers();
  }, []);
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearch(term);
    const filteredData = users.filter((user) =>
      user.name.toLowerCase().includes(term)
    );
    setFiltered(filteredData);
  };
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">User Profiles</h1>
      <div className="max-w-md mx-auto mb-6">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={handleSearch}
          className="w-full p-2 border rounded"
        />
      </div>
      {loading && <p className="text-center text-lg">Loading users...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {!loading &&
          !error &&
          filtered.map((user) => (
            <UserCard
              key={user.id}
              name={user.name}
              email={user.email}
              city={user.address.city}
            />
          ))}
      </div>
    </div>
  );
}

export default App;
