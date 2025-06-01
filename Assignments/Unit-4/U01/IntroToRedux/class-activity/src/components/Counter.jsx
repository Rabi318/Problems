import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "../redux/actions/counterActions";

export const Counter = () => {
  const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();
  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={() => dispatch(increment())}>Inc</button>
      <button onClick={() => dispatch(decrement())}>Dec</button>
    </div>
  );
};
