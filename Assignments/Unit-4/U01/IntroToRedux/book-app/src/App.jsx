import { useState } from "react";
import "./App.css";
import BookForm from "./components/BookForm";
import FilterBar from "./components/FilterBar";
import BookList from "./components/BookList";

function App() {
  return (
    <>
      <div className="container">
        <h1>📚 Book Library</h1>
        <BookForm />
        <FilterBar />
        <BookList />
      </div>
    </>
  );
}

export default App;
