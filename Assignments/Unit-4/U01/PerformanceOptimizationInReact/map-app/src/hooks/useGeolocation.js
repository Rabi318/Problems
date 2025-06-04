import { useState, useEffect } from "react";

const useGeolocation = () => {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) return;
    const watchId = navigator.geolocation.watchPosition(
      (pos) => setPosition(pos.coords),
      (err) => console.error(err),
      { enableHighAccuracy: true }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return position;
};

export default useGeolocation;
