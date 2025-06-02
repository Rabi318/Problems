import axios from "axios";
import {
  FETCH_QUIZ_REQUEST,
  FETCH_QUIZ_SUCCESS,
  FETCH_QUIZ_FAILURE,
  INCREMENT_SCORE,
  NEXT_QUESTION,
} from "./actionTypes";

export const fetchQuiz = () => async (dispatch) => {
  dispatch({ type: FETCH_QUIZ_REQUEST });
  try {
    const res = await axios.get(
      "https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-quiz"
    );
    dispatch({ type: FETCH_QUIZ_SUCCESS, payload: res.data.data });
  } catch (err) {
    dispatch({ type: FETCH_QUIZ_FAILURE, payload: err.message });
  }
};

export const incrementScore = () => ({ type: INCREMENT_SCORE });
export const nextQuestion = () => ({ type: NEXT_QUESTION });
