import React from "react";
import { useCart } from "../context/CartContext";

const CartSummary = () => {
  const { cart, totalPrice, removeFromCart, updateQuantity } = useCart();
  return (
    <div className="p-4 border rounded shadow mt-4">
      <h2 className="text-lg font-bold mb-2">Cart Summary</h2>
      {cart.length === 0 && <p>Your cart is empty.</p>}
      {cart.map((item) => (
        <div
          key={item.id}
          className="flex justify-between items-center mb-2 border-b pb-2"
        >
          <div>
            <p className="font-semibold">{item.title}</p>
            <p>${item.price}</p>
            <input
              type="number"
              value={item.quantity}
              min="1"
              onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
              className="w-12 border rounded px-1"
            />
          </div>
          <button
            onClick={() => removeFromCart(item.id)}
            className="text-red-500"
          >
            Remove
          </button>
        </div>
      ))}
      {cart.length > 0 && (
        <div className="mt-4 font-bold">Total: ${totalPrice.toFixed(2)}</div>
      )}
    </div>
  );
};

export default CartSummary;
