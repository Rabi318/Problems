const initialState = {
  isLoading: false,
  isError: false,
  data: [],
};

export const coffeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_COFFEE_REQUEST":
      return { ...state, isLoading: true };
    case "FETCH_COFFEE_SUCCESS":
      return { ...state, isLoading: false, data: action.payload };
    case "FETCH_COFFEE_FAILURE":
      return { ...state, isLoading: false, isError: true };
    default:
      return state;
  }
};
