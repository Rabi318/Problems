import React from "react";
import { useParams, useNavigate } from "react-router-dom";
const userList = [
  { id: 1, name: "John Doe", age: 25 },
  { id: 2, name: "Jane Smith", age: 30 },
  { id: 3, name: "Alice Johnson", age: 28 },
  { id: 4, name: "Bob Brown", age: 35 },
  { id: 5, name: "Charlie Davis", age: 22 },
];
const UserDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const user = userList.find((user) => user.id === parseInt(id));
  if (!user) {
    return <div>User not found</div>;
  }
  return (
    <div>
      <button onClick={() => navigate(-1)}>⬅️ Go Back</button>
      {user ? (
        <div>
          <h2>User Details</h2>
          <p>Name: {user.name}</p>
          <p>Age: {user.age}</p>
        </div>
      ) : (
        <div>
          <h2>User not found</h2>
        </div>
      )}
    </div>
  );
};

export default UserDetails;
