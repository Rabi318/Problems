import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import User from "./components/User";
import UserDetails from "./components/UserDetails";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<User />} />
        <Route path="/users/:id" element={<UserDetails />} />
      </Routes>
    </>
  );
}

export default App;
