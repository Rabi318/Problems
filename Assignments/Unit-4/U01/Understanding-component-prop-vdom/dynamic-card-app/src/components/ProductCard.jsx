import React from "react";

const ProductCard = ({ name, price, image, discount }) => {
  return (
    <div className="max-w-xs bg-white shadow-lg rounded-lg overflow-hidden border">
      <img src={image} className="w-full h-48 object-cover" alt={name} />
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800">{name}</h2>
        <p className="text-gray-600 text-sm">${price.toFixed(2)}</p>
        {discount !== undefined && (
          <span className="inline-block mt-2 px-2 py-1 text-xs font-semibold text-white bg-red-500 rounded-full">
            {discount}%OFF
          </span>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
