import { useEffect, useMemo, useState } from "react";

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const res = await fetch("https://reqres.in/api/users?page=1");
      const data = await res.json();
      if (!cancelled) setUsers(data.data || []);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const rows = useMemo(
    () =>
      users.map((u) => (
        <tr key={u.id}>
          <td>
            <img
              src={u.avatar}
              alt=""
              width={36}
              height={36}
              style={{ borderRadius: 6 }}
            />
          </td>
          <td>
            {u.first_name} {u.last_name}
          </td>
          <td>{u.email}</td>
        </tr>
      )),
    [users]
  );

  return (
    <div style={{ padding: 16 }}>
      <h2>All Users (Admin)</h2>
      <table cellPadding={8}>
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}
