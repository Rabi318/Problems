import axios from "axios";

import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from "./actionTypes";

export const login = (email, password) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const res = await axios.post(
      "https://reqres.in/api/login",
      { email, password },
      {
        headers: {
          "x-api-key": "reqres-free-v1",
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({ type: LOGIN_SUCCESS, payload: res.data.token });
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: err.message });
  }
};
