import React, { use, useState } from "react";
import ProductCard from "./ProductCard";

const ProductForm = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
    discount: "",
  });
  const [errors, setErrors] = useState({});
  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Name is required";
    if (!formData.price || isNaN(formData.price) || Number(formData.price) <= 0)
      errs.price = "Price must be a positive number";
    if (!formData.image.includes("http"))
      errs.image = "Image must be a valid URL.";
    if (
      formData.discount &&
      (isNaN(formData.discount) ||
        Number(formData.discount) < 0 ||
        Number(formData.discount) > 100)
    )
      errs.discount = "Discount must be between 0 and 100.";
    return errs;
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const newProduct = {
      name: formData.name.trim(),
      price: Number(formData.price),
      image: formData.image.trim(),
      discount: formData.discount ? Number(formData.discount) : undefined,
    };
    console.log(newProduct);
    setProducts((prev) => [...prev, newProduct]);
    setFormData({
      name: "",
      price: "",
      image: "",
      discount: "",
    });
    setErrors({});
  };
  return (
    <div className="p-6 max-w-xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <div>
          <label htmlFor="name" className="block text-sm font-medium">
            Product Name
          </label>
          <input
            type="text"
            name="name"
            className="w-full mt-1 p-2 border rounded"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">Price ($)</label>
          <input
            className="w-full mt-1 p-2 border rounded"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
          />
          {errors.price && (
            <p className="text-red-500 text-sm">{errors.price}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium">Image URL</label>
          <input
            className="w-full mt-1 p-2 border rounded"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />
          {errors.image && (
            <p className="text-red-500 text-sm">{errors.image}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium">Discount (%)</label>
          <input
            className="w-full mt-1 p-2 border rounded"
            name="discount"
            type="number"
            value={formData.discount}
            onChange={handleChange}
          />
          {errors.discount && (
            <p className="text-red-500 text-sm">{errors.discount}</p>
          )}
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add Product
        </button>
      </form>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {products.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
    </div>
  );
};

export default ProductForm;
