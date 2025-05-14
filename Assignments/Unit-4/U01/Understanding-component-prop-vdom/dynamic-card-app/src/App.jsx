import { useState } from "react";

import "./App.css";
import ProductForm from "./components/ProductForm";

function App() {
  return (
    <>
      <div className="bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold text-center py-6">Product Catalog</h1>
        <ProductForm />
      </div>
    </>
  );
}

export default App;
