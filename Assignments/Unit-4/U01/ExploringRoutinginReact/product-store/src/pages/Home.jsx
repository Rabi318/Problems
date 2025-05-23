import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import FilterSortBar from "../components/FilterSortBar";

function Home() {
  const [products, setProducts] = useState([]);
  const [displayed, setDisplayed] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get("https://dummyjson.com/products");
      const fetchedProducts = res.data.products;

      setProducts(fetchedProducts);
      setDisplayed(fetchedProducts);

      // Extract unique categories from product data
      const uniqueCategories = [
        ...new Set(fetchedProducts.map((p) => p.category)),
      ];
      setCategories(uniqueCategories);
    };

    fetchProducts();
  }, []);

  const handleCategoryChange = (category) => {
    if (!category) {
      setDisplayed(products);
    } else {
      const filtered = products.filter((p) => p.category === category);
      setDisplayed(filtered);
    }
  };

  const handleSortChange = (order) => {
    const sorted = [...displayed].sort((a, b) =>
      order === "low" ? a.price - b.price : b.price - a.price
    );
    setDisplayed(sorted);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">All Products</h1>
      <FilterSortBar
        categories={categories}
        onCategoryChange={handleCategoryChange}
        onSortChange={handleSortChange}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {displayed.map((product) => (
          <Link
            to={`/product/${product.id}`}
            key={product.id}
            className="border p-4 rounded shadow hover:shadow-md transition"
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              className="h-40 w-full object-cover mb-2"
            />
            <h2 className="font-semibold">{product.title}</h2>
            <p className="text-sm text-gray-500">${product.price}</p>
            <p className="text-xs text-gray-400">
              Category: {product.category}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
