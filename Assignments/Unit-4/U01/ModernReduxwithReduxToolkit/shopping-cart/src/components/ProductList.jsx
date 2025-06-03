import React from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../features/cart/cartSlice";

const sampleProducts = [
  { id: 1, name: "Apple", price: 2 },
  { id: 2, name: "Banana", price: 1 },
  { id: 3, name: "Orange", price: 1.5 },
];

const ProductList = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Products</h2>
      {sampleProducts.map((product) => (
        <div key={product.id}>
          {product.name} - ${product.price}
          <button onClick={() => dispatch(addItem(product))}>
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
