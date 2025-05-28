import React, { useEffect, useReducer } from "react";

function apiReducer(state, action) {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, data: action.payload };
    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

function FetchData() {
  const [state, dispatch] = useReducer(apiReducer, {
    loading: false,
    data: null,
    error: null,
  });
  async function fetchData() {
    dispatch({ type: "FETCH_START" });
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts/1"
      );
      const result = await response.json();
      dispatch({ type: "FETCH_SUCCESS", payload: result });
    } catch (error) {
      dispatch({ type: "FETCH_ERROR", payload: "Failed to fetch" });
    }
  }
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <h1>Fetch Data</h1>
      {state.loading && <p>Loading...</p>}
      {state.error && <p>{state.error}</p>}
      {state.data && <p>{state.data.title}</p>}
    </div>
  );
}

export default FetchData;
