import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { quizReducer } from "./quizReducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  quiz: quizReducer,
});
