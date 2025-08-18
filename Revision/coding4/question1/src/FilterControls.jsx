import React from "react";
import { useFilters } from "./App";

const FilterControls = () => {
  const { filter, setFilter, sort, setSort } = useFilters();

  return (
    <div>
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option>All</option>
        <option>Electronics</option>
        <option>Fashion</option>
        <option>Books</option>
      </select>

      <select value={sort} onChange={(e) => setSort(e.target.value)}>
        <option value="none">No Sort</option>
        <option value="low">Price: Low → High</option>
        <option value="high">Price: High → Low</option>
      </select>
    </div>
  );
};

export default FilterControls;
