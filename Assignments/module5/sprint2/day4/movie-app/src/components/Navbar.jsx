import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to={"/"} className="text-white text-lg font-bold">
          MovieApp
        </Link>
        <Link to={"/add-movie"} className="text-white">
          Add Movie
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
