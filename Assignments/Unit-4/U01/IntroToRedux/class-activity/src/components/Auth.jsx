import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../redux/actions/authActions";

const Auth = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  return (
    <div>
      <h2>{isAuthenticated ? "Authenticated" : "Not Authenticated"}</h2>
      {isAuthenticated ? (
        <button onClick={() => dispatch(logout())}>Logout</button>
      ) : (
        <button onClick={() => dispatch(login())}>Login</button>
      )}
    </div>
  );
};

export default Auth;
