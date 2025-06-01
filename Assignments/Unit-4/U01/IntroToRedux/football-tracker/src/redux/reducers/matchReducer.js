// redux/reducers/matchReducer.js
const initialState = {
  isLoading: false,
  isError: false,
  footballMatches: [],
  favorites: [],
  filters: {},
  searchTerm: "",
};

const matchReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_MATCHES_REQUEST":
      return { ...state, isLoading: true };
    case "FETCH_MATCHES_SUCCESS":
      return { ...state, isLoading: false, footballMatches: action.payload };
    case "FETCH_MATCHES_FAILURE":
      return { ...state, isLoading: false, isError: true };
    case "ADD_FAVORITE":
      return { ...state, favorites: [...state.favorites, action.payload] };
    case "REMOVE_FAVORITE":
      return {
        ...state,
        favorites: state.favorites.filter((m) => m.id !== action.payload.id),
      };
    case "SET_SEARCH_TERM":
      return { ...state, searchTerm: action.payload };
    case "SET_FILTERS":
      return { ...state, filters: action.payload };
    default:
      return state;
  }
};

export default matchReducer;
