import React from "react";
import { useSelector } from "react-redux";
import BookItem from "./BookItem";

const BookList = () => {
  const books = useSelector((state) => state.books);
  const filters = useSelector((state) => state.filters);

  const filteredBooks = books.filter((book) => {
    return (
      (!filters.author ||
        book.author.toLowerCase().includes(filters.author.toLowerCase())) &&
      (!filters.genre ||
        book.genre.toLowerCase().includes(filters.genre.toLowerCase())) &&
      (!filters.status || book.status === filters.status)
    );
  });

  return (
    <ul>
      {filteredBooks.map((book) => (
        <BookItem key={book.id} book={book} />
      ))}
    </ul>
  );
};

export default BookList;
