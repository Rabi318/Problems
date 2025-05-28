import React, { useReducer } from "react";

function todoReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        { id: Date.now(), text: action.payload, completed: false },
      ];
    case "TOGGLE":
      return state.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    case "DELETE":
      return state.filter((todo) => todo.id !== action.payload);
    default:
      return state;
  }
}

const TodoApp2 = () => {
  const [todos, dispatch] = useReducer(todoReducer, []);
  return (
    <div>
      <h1>Todo App 2</h1>
      <button onClick={() => dispatch({ type: "ADD", payload: "New Task" })}>
        Add Todo
      </button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span
              style={{ textDecoration: todo.completed ? "line-through" : "" }}
              onClick={() => dispatch({ type: "TOGGLE", payload: todo.id })}
            >
              {todo.text}
            </span>
            <button
              onClick={() => dispatch({ type: "DELETE", payload: todo.id })}
            >
              Dlt
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp2;
