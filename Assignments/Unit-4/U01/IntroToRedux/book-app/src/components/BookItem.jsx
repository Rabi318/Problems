import React from "react";
import { useDispatch } from "react-redux";
import { deleteBook, markBookAsRead } from "../actions/bookActions";

const BookItem = ({ book }) => {
  const dispatch = useDispatch();

  return (
    <li style={{ margin: "10px 0" }}>
      <strong>{book.title}</strong> by {book.author} | Genre: {book.genre} |
      Status: {book.status}
      <button onClick={() => dispatch(markBookAsRead(book.id))}>
        Mark as Read
      </button>
      <button onClick={() => dispatch(deleteBook(book.id))}>Delete</button>
    </li>
  );
};

export default BookItem;
