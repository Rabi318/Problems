import React, { useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import useGeolocation from "../hooks/useGeolocation";
import L from "leaflet";

const MapView = React.memo(({ pois = [] }) => {
  const position = useGeolocation();

  const userIcon = useMemo(
    () =>
      L.icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/512/64/64113.png",
        iconSize: [30, 30],
      }),
    []
  );

  if (!position) return <p>Getting location...</p>;

  return (
    <MapContainer
      center={[position.latitude, position.longitude]}
      zoom={13}
      style={{ height: "80vh", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker
        position={[position.latitude, position.longitude]}
        icon={userIcon}
      >
        <Popup>You are here</Popup>
      </Marker>

      {pois.map((poi, idx) => (
        <Marker key={idx} position={[poi.lat, poi.lon]}>
          <Popup>{poi.display_name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
});

export default MapView;
