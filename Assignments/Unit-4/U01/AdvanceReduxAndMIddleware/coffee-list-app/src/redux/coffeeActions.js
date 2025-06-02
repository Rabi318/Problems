import axios from "axios";
export const fetchCoffee =
  (sort = "") =>
  async (dispatch) => {
    dispatch({ type: "FETCH_COFFEE_REQUEST" });
    try {
      const url = `https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-coffee`;
      const response = await axios.get(url);
      console.log(response.data.data);
      dispatch({ type: "FETCH_COFFEE_SUCCESS", payload: response.data.data });
    } catch (error) {
      dispatch({ type: "FETCH_COFFEE_FAILURE" });
    }
  };
