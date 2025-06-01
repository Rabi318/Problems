// components/SearchBar.jsx
import React from "react";
import { useDispatch } from "react-redux";

const SearchBar = () => {
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    dispatch({ type: "SET_SEARCH_TERM", payload: e.target.value });
  };

  return <input type="text" placeholder="Search..." onChange={handleSearch} />;
};

export default SearchBar;
