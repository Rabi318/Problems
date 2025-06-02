import { createStore, applyMiddleware } from "redux";
import { CounterReducer } from "./reducer";
import { logger, delayMiddleware } from "./middleware";

//custom middleware

//create store
export const store = createStore(
  CounterReducer,
  applyMiddleware(logger, delayMiddleware)
);
