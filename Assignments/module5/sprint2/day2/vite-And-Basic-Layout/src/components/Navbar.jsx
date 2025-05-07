import React from "react";

function Navbar() {
  return (
    <nav className="bg-gray-800 p-3">
      <ul className="flex justify-center space-x-6">
        <li>
          <a href="#" className="text-white hover:text-blue-500">
            Home
          </a>
        </li>
        <li>
          <a href="#" className="text-white hover:text-blue-500">
            About
          </a>
        </li>
        <li>
          <a href="#" className="text-white hover:text-blue-500">
            Contact
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
