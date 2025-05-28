import React, { useReducer, useRef } from "react";

const initialValue = { count: 0 };

const reducer = (state, action) => {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    case "DECREMENT":
      return { count: state.count - 1 };
    default:
      return state;
  }
};
function App() {
  const [state, dispatch] = useReducer(reducer, initialValue);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Simple Counter</h1>

      <div className="text-4xl font-semibold mb-6">{state.count}</div>

      <div className="space-x-4">
        <button
          onClick={() => dispatch({ type: "INCREMENT" })}
          className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Increment
        </button>

        <button
          onClick={() => dispatch({ type: "DECREMENT" })}
          className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Decrement
        </button>
      </div>
    </div>
  );
}

export default App;
