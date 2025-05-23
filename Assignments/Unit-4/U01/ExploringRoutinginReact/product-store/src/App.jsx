import React, { useContext } from "react";

import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Navbar from "./components/Navbar";
function App() {
  return (
    <>
      <div className="min-h-screen font-sans">
        <Navbar />
        <div className="p-4 max-w-4xl mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
