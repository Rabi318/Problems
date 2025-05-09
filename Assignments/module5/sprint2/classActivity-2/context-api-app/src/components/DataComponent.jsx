import React, { useContext } from "react";
import { DataContext } from "../context/DataProvider";

function DataComponent() {
  const { state, fetchData } = useContext(DataContext);
  return (
    <div>
      <button onClick={fetchData}>Fetch Data</button>
      {state.loading && <p>Loading...</p>}
      {state.error && <p>{state.error}</p>}
      {state.data &&
        state.data.map((post) => {
          return (
            <div key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.body}</p>
            </div>
          );
        })}
    </div>
  );
}

export default DataComponent;
