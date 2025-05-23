import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`https://dummyjson.com/products/${id}`).then((res) => {
      setProduct(res.data);
    });
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full h-64 object-cover rounded mb-4"
      />
      <p className="mb-2 text-gray-700">{product.description}</p>
      <p className="font-semibold text-lg">Price: ${product.price}</p>
      <p className="text-sm mt-2">Category: {product.category}</p>
    </div>
  );
}

export default ProductDetails;
