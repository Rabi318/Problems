import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Signup from "./components/Signup";
import { Routes, Route, NavLink } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
