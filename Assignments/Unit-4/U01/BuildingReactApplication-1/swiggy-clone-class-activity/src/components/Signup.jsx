import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../features/auth/authSlice";
import { swiggyLogo } from "../utils/constant";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setFormError("Please enter email and password");
      return;
    }
    if (password.length < 6) {
      setFormError("Password must be at least 6 characters");
      return;
    }
    setFormError("");
    dispatch(signupUser({ email, password }));
  };

  useEffect(() => {
    if (user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div className=" max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <div className="flex justify-center mb-4">
        {/* Swiggy logo */}
        <img className="w-24 h-auto" src={swiggyLogo} alt="Swiggy" />
      </div>
      <h2 className="text-2xl font-semibold text-center mb-4">
        Signup for Swiggy
      </h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-2"
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-2"
        />
        {formError && (
          <div className="text-red-500 text-sm mb-2">{formError}</div>
        )}
        {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
        <button
          className="w-full bg-orange-500 cursor-pointer hover:bg-amber-600 text-white py-2 rounded"
          type="submit"
          disabled={loading}
        >
          {loading ? "Signing up..." : "Signup"}
        </button>
      </form>
    </div>
  );
};

export default Signup;
