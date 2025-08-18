import React, { memo } from "react";
import { useFilters } from "./App";

const ProductHeader = () => {
  const { filter, sort } = useFilters();
  return (
    <div>
      <h2>Product Dashboard</h2>
      <p>
        Filter: {filter} | Sort: {sort}
      </p>
    </div>
  );
};

export default memo(ProductHeader);
