import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../redux2/action";

const DataFetch = () => {
  const { loading, data, error } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);
  return (
    <div>
      <h2>Async Data Fetching with redux thunk</h2>
      {loading && <h3>Loading...</h3>}
      {error && <h3>{error}</h3>}
      {data && (
        <div>
          <h1>ID: {data.id}</h1>
          <h2>Title: {data.title}</h2>
        </div>
      )}
    </div>
  );
};

export default DataFetch;
