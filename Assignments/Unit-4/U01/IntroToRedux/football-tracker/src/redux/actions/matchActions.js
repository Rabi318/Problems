import { fetchMatches } from "../../api/matchesApi";

export const getMatches = () => async (dispatch) => {
  dispatch({ type: "FETCH_MATCHES_REQUEST" });
  try {
    const matches = await fetchMatches();
    dispatch({ type: "FETCH_MATCHES_SUCCESS", payload: matches });
  } catch (error) {
    dispatch({ type: "FETCH_MATCHES_FAILURE" });
  }
};

export const addFavorite = (match) => ({
  type: "ADD_FAVORITE",
  payload: match,
});

export const removeFavorite = (match) => ({
  type: "REMOVE_FAVORITE",
  payload: match,
});

export const setSearchTerm = (term) => ({
  type: "SET_SEARCH_TERM",
  payload: term,
});

export const setFilters = (filters) => ({
  type: "SET_FILTERS",
  payload: filters,
});
