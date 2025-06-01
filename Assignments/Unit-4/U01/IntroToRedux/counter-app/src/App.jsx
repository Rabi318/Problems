import { useState } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "./counterAction";

function App() {
  const count = useSelector((state) => state.count);
  const dispatch = useDispatch();
  return (
    <>
      <h1>Count: {count}</h1>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())} disabled={count === 0}>
        Decrement
      </button>
    </>
  );
}

export default App;
