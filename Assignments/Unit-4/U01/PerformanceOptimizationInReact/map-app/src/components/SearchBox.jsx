import React, { useState, useCallback } from "react";
import axios from "axios";

const SearchBox = React.memo(({ onResults }) => {
  const [query, setQuery] = useState("");

  const search = useCallback(async () => {
    if (!query) return;
    const res = await axios.get(
      `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
    );
    onResults(res.data);
  }, [query, onResults]);

  return (
    <div style={{ marginBottom: 10 }}>
      <input
        type="text"
        placeholder="Search address or POI"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={search}>Search</button>
    </div>
  );
});

export default SearchBox;
