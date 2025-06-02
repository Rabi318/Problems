import {
  FETCH_QUIZ_FAILURE,
  FETCH_QUIZ_REQUEST,
  FETCH_QUIZ_SUCCESS,
  INCREMENT_SCORE,
  NEXT_QUESTION,
} from "./actionTypes";

const initialState = {
  loading: false,
  questions: [],
  currentIndex: 0,
  score: 0,
  error: null,
};

export const quizReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_QUIZ_REQUEST:
      return { ...state, loading: true };
    case FETCH_QUIZ_SUCCESS:
      return { ...state, loading: false, questions: action.payload };
    case FETCH_QUIZ_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case INCREMENT_SCORE:
      return { ...state, score: state.score + 1 };
    case NEXT_QUESTION:
      return { ...state, currentIndex: state.currentIndex + 1 };
    default:
      return state;
  }
};
