import React, { memo } from "react";
import { useProducts } from "./App";

const ProductCard = ({ product }) => {
  const { updateStock, removeProduct } = useProducts();

  return (
    <div style={{ border: "1px solid #ccc", padding: "10px" }}>
      <h3>{product.name}</h3>
      <p>Category: {product.category}</p>
      <p>Price: ${product.price}</p>
      <p>Stock: {product.stock}</p>
      <button onClick={() => updateStock(product.id, product.stock - 1)}>
        Reduce Stock
      </button>
      <button onClick={() => removeProduct(product.id)}>Remove</button>
    </div>
  );
};

export default memo(ProductCard);
