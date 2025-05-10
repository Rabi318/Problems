import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  const linkStyle =
    "text-gray-700 hover:text-blue-500 px-3 py-2 transition-colors duration-200";
  const activeStyle = "text-blue-600 font-semibold border-b-2 border-blue-600";
  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between">
        <h1 className="text-xl font-bold mb-2 sm:mb-0">MyApp</h1>
        <div className="flex flex-col sm:flex-row">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${linkStyle} ${isActive ? activeStyle : ""}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `${linkStyle} ${isActive ? activeStyle : ""}`
            }
          >
            About
          </NavLink>
          <NavLink
            to="/services"
            className={({ isActive }) =>
              `${linkStyle} ${isActive ? activeStyle : ""}`
            }
          >
            Services
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `${linkStyle} ${isActive ? activeStyle : ""}`
            }
          >
            Contact
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
