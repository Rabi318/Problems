import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement } from "./features/counter/counterSlice";

const App = () => {
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter.value);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Counter App</h1>
      <h2>{counter}</h2>
      <button onClick={() => dispatch(increment())}>Increment</button>{" "}
      <button onClick={() => dispatch(decrement())}>Decrement</button>
    </div>
  );
};

export default App;
