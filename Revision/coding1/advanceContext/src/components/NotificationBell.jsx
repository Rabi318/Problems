import React from "react";
import {
  useNotifications,
  useNotificationActions,
} from "../context/NotificationContext";

function NotificationBell() {
  const { items } = useNotifications(); // only re-renders when notifications change
  const { markAllRead } = useNotificationActions();

  const unread = items.filter((n) => !n.read).length;

  return (
    <button
      onClick={markAllRead}
      title={unread ? `${unread} unread` : "No new notifications"}
      style={{ position: "relative" }}
    >
      🔔
      {unread > 0 && (
        <span
          style={{
            position: "absolute",
            top: -6,
            right: -8,
            background: "red",
            color: "#fff",
            borderRadius: 999,
            padding: "0 6px",
            fontSize: 12,
          }}
        >
          {unread}
        </span>
      )}
    </button>
  );
}

export default React.memo(NotificationBell);
