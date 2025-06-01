import { createStore } from "redux";
import counterReducer from "./countReducer";

const store = createStore(counterReducer);

export default store;
