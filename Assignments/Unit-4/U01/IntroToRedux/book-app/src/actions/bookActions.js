export const ADD_BOOK = "ADD_BOOK";
export const EDIT_BOOK = "EDIT_BOOK";
export const DELETE_BOOK = "DELETE_BOOK";
export const MARK_READ = "MARK_READ";

export const addBook = (book) => ({ type: ADD_BOOK, payload: book });
export const editBook = (book) => ({ type: EDIT_BOOK, payload: book });
export const deleteBook = (id) => ({ type: DELETE_BOOK, payload: id });
export const markBookAsRead = (id) => ({ type: MARK_READ, payload: id });
