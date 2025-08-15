import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ProductList from "./components/ProductList";
import CartSummary from "./components/CartSummary";

function App() {
  return (
    <>
      <div className="max-w-5xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Mini E-commerce</h1>
        <ProductList />
        <CartSummary />
      </div>
    </>
  );
}

export default App;
