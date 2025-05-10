import { useState } from "react";

import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MovieProvider } from "./context/movieContext";
import Movies from "./pages/Movies";
import AddMovie from "./pages/AddMovie";

function App() {
  return (
    <>
      <MovieProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Movies />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/add-movie" element={<AddMovie />} />
            <Route path="/edit-movie/:id" element={<AddMovie />} />
          </Routes>
        </Router>
      </MovieProvider>
    </>
  );
}

export default App;
