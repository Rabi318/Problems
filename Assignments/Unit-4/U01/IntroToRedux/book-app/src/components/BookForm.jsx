import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addBook } from "../actions/bookActions";

const BookForm = () => {
  const [book, setBook] = useState({
    title: "",
    author: "",
    genre: "",
    status: "unread",
  });
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!book.title || !book.author) return;
    dispatch(addBook({ ...book, id: Date.now() }));
    setBook({ title: "", author: "", genre: "", status: "unread" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Title"
        value={book.title}
        onChange={(e) => setBook({ ...book, title: e.target.value })}
      />
      <input
        placeholder="Author"
        value={book.author}
        onChange={(e) => setBook({ ...book, author: e.target.value })}
      />
      <input
        placeholder="Genre"
        value={book.genre}
        onChange={(e) => setBook({ ...book, genre: e.target.value })}
      />
      <button type="submit">Add Book</button>
    </form>
  );
};

export default BookForm;
