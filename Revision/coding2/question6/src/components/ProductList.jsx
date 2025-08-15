import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCart } from "../context/CartContext";
import { fetchProduct } from "../features/products/productsSlice";

const ProductList = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.products);
  const { addToCart } = useCart();

  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);
  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
      {items.map((product) => (
        <div key={product.id} className="border p-4 rounded shadow">
          <img
            src={product.image}
            alt={product.title}
            className="h-32 mx-auto object-contain"
          />
          <h3 className="font-bold text-sm mt-2">{product.title}</h3>
          <p className="text-green-600 font-semibold">${product.price}</p>
          <button
            onClick={() => addToCart(product)}
            className="bg-blue-500 text-white px-2 py-1 mt-2 rounded"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
