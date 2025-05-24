import { useState } from "react";

import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";

function App() {
  return (
    <>
      <Router>
        <nav className="bg-gray-900 text-white p-4 text-lg">
          <Link to="/" className="font-bold">
            🎬 Movie Search App
          </Link>
        </nav>
        <div className="p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
