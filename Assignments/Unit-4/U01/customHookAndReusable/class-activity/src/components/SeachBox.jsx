import React, { useEffect, useState } from "react";
import useDebounce from "../hooks/useDebounce";

const SeachBox = () => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    if (debouncedSearch) {
      console.log(`API Called with ${debouncedSearch}`);
    }
  }, [debouncedSearch]);
  return (
    <div>
      <h1>Search</h1>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search"
      />
    </div>
  );
};

export default SeachBox;
