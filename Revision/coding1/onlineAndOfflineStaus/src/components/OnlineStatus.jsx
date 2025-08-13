import { useEffect, useState } from "react";

export default function OnlineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 10,
        right: 10,
        padding: "8px 12px",
        borderRadius: "20px",
        backgroundColor: isOnline ? "#4caf50" : "#f44336",
        color: "#fff",
        fontWeight: "bold",
        boxShadow: "0px 2px 6px rgba(0,0,0,0.2)",
        zIndex: 1000,
      }}
    >
      {isOnline ? "🟢 Online" : "🔴 Offline"}
    </div>
  );
}
