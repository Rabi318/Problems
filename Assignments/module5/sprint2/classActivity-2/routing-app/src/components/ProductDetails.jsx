import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ProductDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  async function fetchData() {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    const data = await res.json();
    setProduct(data);
  }
  useEffect(() => {
    fetchData();
  }, []);
  if (!product) {
    return <h1>Loading...</h1>;
  }
  return (
    <>
      <h2>Product Details</h2>
      <button onClick={() => navigate(-1)}>Go Back</button>
      {product && (
        <div>
          <img src={product.image} width="150" alt="" />
          <h3>{product.title}</h3>
          <p>{product.price}</p>
        </div>
      )}
    </>
  );
}

export default ProductDetails;
