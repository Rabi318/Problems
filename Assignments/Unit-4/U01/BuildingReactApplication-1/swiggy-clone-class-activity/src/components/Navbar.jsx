import React, { use } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../features/auth/authSlice";
import {
  Briefcase,
  ChevronDown,
  CircleHelp,
  House,
  Search,
  ShoppingCartIcon,
  User,
} from "lucide-react";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white shadow-sm">
      <div className="flex items-center">
        <div className="h-10 w-10 rounded-full bg-orange-500 flex items-center justify-center mr-4 ">
          <House size={24} className="text-white" />
        </div>
        <div className="flex items-center">
          <span className="font-semibold">Other</span>
          <ChevronDown size={16} className="ml-1 text-gray-600" />
        </div>
      </div>
      {/* nav items */}
      <div className="flex items-center space-x-6">
        <div className="flex items-center ">
          <Briefcase className="mr-1" size={20} />
          <span>Swiggy Corporate</span>
        </div>
        <div className="flex items-center ">
          <Search className="mr-1" size={20} />
          <span>Search</span>
        </div>
        <div className="flex items-center ">
          <CircleHelp className="mr-1" size={20} />
          <span>Help</span>
        </div>
        <div className="flex items-center ">
          <User className="mr-1" size={20} />
          <span>SignIn</span>
        </div>
        <div className="flex items-center ">
          <div className="relative">
            <ShoppingCartIcon size={20} />
            <span className="absolute top-0 right-0 bg-red-500 text-white w-4 h-4 rounded-full flex items-center justify-center">
              0
            </span>
            <span className="ml-1">Cart</span>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
