import React, { useReducer } from "react";

const initialState = {
  theme: "light",
};
const reducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_THEME":
      return {
        ...state,
        theme: state.theme === "light" ? "dark" : "light",
      };
    default:
      return state;
  }
};
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const isDark = state.theme === "dark";
  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center transition duration-500 ${
        isDark ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <h1 className="text-3xl font-bold mb-4">
        Current Theme: {state.theme.toUpperCase()}
      </h1>

      <button
        onClick={() => dispatch({ type: "TOGGLE_THEME" })}
        className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded"
      >
        Toggle Theme
      </button>
    </div>
  );
}

export default App;
