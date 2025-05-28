import React from "react";

const initialValue = {
  isVisible: false,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_VISIBILITY":
      return {
        isVisible: !state.isVisible,
      };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialValue);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">useReducer Toggle Example</h1>

      <button
        onClick={() => dispatch({ type: "TOGGLE_VISIBILITY" })}
        className="mb-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Toggle Message
      </button>

      {state.isVisible && (
        <p className="text-lg text-green-600 font-semibold">Hello, World!</p>
      )}
    </div>
  );
}

export default App;
