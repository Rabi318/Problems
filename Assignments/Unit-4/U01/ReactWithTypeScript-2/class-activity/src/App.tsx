import React, { useEffect, useState } from "react";
import type { User } from "./types/userTypes";

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  async function fetchData() {
    try {
      let response = await fetch("https://reqres.in/api/users?page=1");
      let result = await response.json();
      setUsers(result.data);
      console.log(result.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);
  return <div>App</div>;
};

export default App;
