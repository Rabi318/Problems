// redux/store.js
import { createStore } from "redux";
import matchReducer from "./reducers/matchReducer";

const store = createStore(matchReducer);
export default store;
