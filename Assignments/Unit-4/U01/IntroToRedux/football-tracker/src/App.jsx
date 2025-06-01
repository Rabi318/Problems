import { useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import FilterOptions from "./components/FilterOptions";
import MatchList from "./components/MatchList";
import FavoriteMatches from "./components/FavoriteMatches";

function App() {
  return (
    <>
      <div style={{ padding: "1rem", fontFamily: "Arial, sans-serif" }}>
        <h1>Football Match Tracker</h1>
        <SearchBar />
        <FilterOptions />
        <MatchList />
        <FavoriteMatches />
      </div>
    </>
  );
}

export default App;
