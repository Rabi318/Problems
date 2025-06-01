import {
  ADD_BOOK,
  EDIT_BOOK,
  DELETE_BOOK,
  MARK_READ,
} from "../actions/bookActions";

const initialState = [];

const bookReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BOOK:
      return [...state, action.payload];
    case EDIT_BOOK:
      return state.map((book) =>
        book.id === action.payload.id ? action.payload : book
      );
    case DELETE_BOOK:
      return state.filter((book) => book.id !== action.payload);
    case MARK_READ:
      return state.map((book) =>
        book.id === action.payload ? { ...book, status: "read" } : book
      );
    default:
      return state;
  }
};

export default bookReducer;
