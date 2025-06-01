import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, deleteTodo, toggleTodo } from "../actions/todoActions";
import TodoItem from "./TodoItem";

const TodoApp = () => {
  const [title, setTitle] = useState("");
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    if (title.trim()) {
      dispatch(addTodo(title));
      setTitle("");
    }
  };
  return (
    <div style={{ padding: "20px" }}>
      <h2>Todo List</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter todo"
      />
      <button onClick={handleAddTodo}>Add Todo</button>
      <h3>State (stringified):</h3>
      <pre>{JSON.stringify({ todos }, null, 2)}</pre>
      <ul>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={() => dispatch(toggleTodo(todo.id))}
            onDelete={() => dispatch(deleteTodo(todo.id))}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
