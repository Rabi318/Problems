import React, { useReducer } from "react";

const initialValue = {
  email: "",
  password: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "email":
      return { ...state, email: action.payload };
    case "password":
      return { ...state, password: action.payload };
    case "reset":
      return initialValue;
    default:
      throw new Error("invalid action type");
  }
};
function App() {
  const [state, dispatch] = useReducer(reducer, initialValue);
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (state.email && state.password) {
      setSubmitted(true);
    }
  };
  const handleRest = () => {
    dispatch({ type: "reset" });
    setSubmitted(false);
  };
  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h1 className="text-xl font-bold mb-4">User Login Form</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={state.email}
            onChange={(e) =>
              dispatch({ type: "email", payload: e.target.value })
            }
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            value={state.password}
            onChange={(e) =>
              dispatch({ type: "password", payload: e.target.value })
            }
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Submit
        </button>

        <button
          type="button"
          onClick={handleRest}
          className="ml-4 px-4 py-2 bg-gray-500 text-white rounded"
        >
          Reset
        </button>
      </form>

      <div className="mt-6">
        {submitted ? (
          <div>
            <div>User Email: {state.email}</div>
            <div>User Password: {state.password}</div>
          </div>
        ) : (
          <div>No details found</div>
        )}
      </div>
    </div>
  );
}

export default App;
