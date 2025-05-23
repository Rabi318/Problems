import React from "react";

function FilterSortBar({ categories, onCategoryChange, onSortChange }) {
  return (
    <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
      <select
        onChange={(e) => onCategoryChange(e.target.value)}
        className="p-2 border rounded"
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </option>
        ))}
      </select>

      <select
        onChange={(e) => onSortChange(e.target.value)}
        className="p-2 border rounded"
      >
        <option value="">Sort By</option>
        <option value="low">Price: Low to High</option>
        <option value="high">Price: High to Low</option>
      </select>
    </div>
  );
}

export default FilterSortBar;
