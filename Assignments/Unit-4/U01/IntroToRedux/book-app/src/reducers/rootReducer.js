import { combineReducers } from "redux";
import bookReducer from "./bookReducer";
import filterReducer from "./filterReducer";

const rootReducer = combineReducers({
  books: bookReducer,
  filters: filterReducer,
});

export default rootReducer;
