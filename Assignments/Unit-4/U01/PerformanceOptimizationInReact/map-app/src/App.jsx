import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import MapView from "./components/MapView";
import SearchBox from "./components/SearchBox";
import { useCallback } from "react";

function App() {
  const [pois, setPois] = useState([]);

  const handleSearchResults = useCallback((data) => {
    setPois(data);
  }, []);

  return (
    <>
      <div>
        <h2 style={{ textAlign: "center" }}>🗺️ Smart Map Tracker</h2>
        <SearchBox onResults={handleSearchResults} />
        <MapView pois={pois} />
      </div>
    </>
  );
}

export default App;
