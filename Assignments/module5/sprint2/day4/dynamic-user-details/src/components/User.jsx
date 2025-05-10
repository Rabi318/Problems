import React from "react";
import { Link } from "react-router-dom";

const userList = [
  { id: 1, name: "John Doe", age: 25 },
  { id: 2, name: "Jane Smith", age: 30 },
  { id: 3, name: "Alice Johnson", age: 28 },
  { id: 4, name: "Bob Brown", age: 35 },
  { id: 5, name: "Charlie Davis", age: 22 },
];

const User = () => {
  return (
    <div>
      <h2>User List</h2>
      <ul>
        {userList.map((user) => (
          <li key={user.id}>
            <Link to={`/users/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default User;
