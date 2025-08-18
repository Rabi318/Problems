// App.jsx
import React, {
  useState,
  useMemo,
  createContext,
  useContext,
  useCallback,
} from "react";
import ProductHeader from "./ProductHeader";
import ProductList from "./ProductList";
import Summary from "./Summary";
import FilterControls from "./FilterControls";

const ProductsContext = createContext();
const FiltersContext = createContext();

export const useProducts = () => useContext(ProductsContext);
export const useFilters = () => useContext(FiltersContext);

const dummyProducts = [
  {
    id: 1,
    name: "Laptop",
    price: 800,
    category: "Electronics",
    rating: 4.5,
    stock: 10,
  },
  {
    id: 2,
    name: "Shoes",
    price: 120,
    category: "Fashion",
    rating: 4.2,
    stock: 5,
  },
  {
    id: 3,
    name: "Headphones",
    price: 200,
    category: "Electronics",
    rating: 4.0,
    stock: 15,
  },
  {
    id: 4,
    name: "Shirt",
    price: 40,
    category: "Fashion",
    rating: 3.8,
    stock: 30,
  },
  { id: 5, name: "Book", price: 25, category: "Books", rating: 4.9, stock: 50 },
];

export default function App() {
  const [products, setProducts] = useState(dummyProducts);
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("none");

  // Filtering + sorting runs only when filter/sort changes
  const visibleProducts = useMemo(() => {
    let result = [...products];
    if (filter !== "All") {
      result = result.filter((p) => p.category === filter);
    }
    if (sort === "low") result.sort((a, b) => a.price - b.price);
    if (sort === "high") result.sort((a, b) => b.price - a.price);
    return result;
  }, [products, filter, sort]);

  // Total price calculated only when visibleProducts changes
  const totalPrice = useMemo(
    () => visibleProducts.reduce((sum, p) => sum + p.price, 0),
    [visibleProducts]
  );

  // Update stock safely
  const updateStock = useCallback((id, newStock) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, stock: newStock } : p))
    );
  }, []);

  const addProduct = useCallback((product) => {
    setProducts((prev) => [...prev, { ...product, id: Date.now() }]);
  }, []);

  const removeProduct = useCallback((id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }, []);

  return (
    <FiltersContext.Provider value={{ filter, setFilter, sort, setSort }}>
      <ProductsContext.Provider
        value={{ products, updateStock, addProduct, removeProduct }}
      >
        <div className="app">
          <ProductHeader />
          <FilterControls />
          <Summary total={totalPrice} />
          <ProductList products={visibleProducts} />
        </div>
      </ProductsContext.Provider>
    </FiltersContext.Provider>
  );
}
