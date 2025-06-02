import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, incrementAsync } from "../redux/action";

const Counter = () => {
  const count = useSelector((state) => state.counter);
  const dispatch = useDispatch();
  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={() => dispatch(increment())}>Inc</button>
      <button onClick={() => dispatch(decrement())}>Dec</button>
      <button onClick={() => dispatch(incrementAsync())}>Inc After 2s</button>
    </div>
  );
};

export default Counter;
