import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <Link to="/" className="font-bold text-xl">
        Product Store
      </Link>
    </nav>
  );
}

export default Navbar;
