import { useNotificationActions } from "../context/NotificationContext";

export default function Dashboard() {
  const { push } = useNotificationActions();

  return (
    <div style={{ padding: 16 }}>
      <h2>Dashboard</h2>
      <p>This page can broadcast notifications app-wide.</p>
      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
        <button onClick={() => push("Welcome! You’re now logged in.")}>
          Send Welcome
        </button>
        <button onClick={() => push("New system message for everyone!")}>
          Send System Message
        </button>
      </div>
    </div>
  );
}
