import { useState } from "react";
import "./App.css";

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
