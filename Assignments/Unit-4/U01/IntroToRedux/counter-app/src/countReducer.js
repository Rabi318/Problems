import { INCREMENT, DECREMENT } from "./counterAction";

const inititalState = { count: 0 };

const counterReducer = (state = inititalState, action) => {
  switch (action.type) {
    case INCREMENT:
      return { ...state, count: state.count + 1 };
    case DECREMENT:
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
};

export default counterReducer;
