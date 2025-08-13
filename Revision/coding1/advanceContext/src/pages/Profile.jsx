import { useAuthState } from "../context/AuthContext";

export default function Profile() {
  const { user, role } = useAuthState();
  if (!user) return null;

  return (
    <div style={{ padding: 16 }}>
      <h2>My Profile</h2>
      <img
        src={user.avatar}
        alt="avatar"
        width={80}
        height={80}
        style={{ borderRadius: 8 }}
      />
      <p>
        <b>Name:</b> {user.first_name} {user.last_name}
      </p>
      <p>
        <b>Email:</b> {user.email}
      </p>
      <p>
        <b>Role:</b> {role}
      </p>
    </div>
  );
}
