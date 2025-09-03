import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <Link to="/dashboard" className="font-bold text-lg">
        Notes App
      </Link>

      <div className="flex items-center gap-6">
        {user && (
          <>
            <Link to="/profile" className="hover:underline text-sm">
              {user.name} ({user.role})
            </Link>

            <button
              onClick={logout}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
