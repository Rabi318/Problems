import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

function ProductList() {
  const [products, setProducts] = useState([]);
  async function fetchData() {
    let res = await fetch("https://fakestoreapi.com/products");
    let data = await res.json();
    setProducts(data);
  }
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <h2>ProductList</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: "10px",
          padding: "10px",
        }}
      >
        {products.map((product) => (
          <div style={{ border: "1px solid gray" }} key={product.id}>
            <img src={product.image} width="150" alt="" />
            <h3>{product.title}</h3>
            <p>{product.price}</p>
            <Link style={{ cursor: "pointer" }} to={`/products/${product.id}`}>
              View Details
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}

export default ProductList;
