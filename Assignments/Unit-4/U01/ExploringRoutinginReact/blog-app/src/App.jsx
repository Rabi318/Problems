import React, { useContext } from "react";

import { Navbar } from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import PostDetails from "./pages/PostDetails";

function App() {
  return (
    <>
      <div className="min-h-screen font-sans">
        <Navbar />
        <div className="p-4 max-w-4xl mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/post/:id" element={<PostDetails />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
