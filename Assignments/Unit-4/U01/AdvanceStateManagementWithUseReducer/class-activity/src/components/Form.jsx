import React, { useReducer } from "react";

const initialValue = {
  name: "",
  email: "",
  age: "",
};

function formReducer(state, action) {
  switch (action.type) {
    case "UPDATE_FIELD":
      return { ...state, [action.field]: action.value };
  }
}

function Form() {
  const [state, dispatch] = useReducer(formReducer, initialValue);
  function handleInputChange(event) {
    const { name, value } = event.target;
    dispatch({ type: "UPDATE_FIELD", field: name, value: value });
  }
  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <div>
      <h2>Form Data with useReducer</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={state.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={state.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="age">Age:</label>
          <input
            type="text"
            name="age"
            placeholder="Enter your age"
            value={state.age}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Form;
