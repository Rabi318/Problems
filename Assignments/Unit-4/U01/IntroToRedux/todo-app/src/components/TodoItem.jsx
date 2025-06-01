import React from "react";

const TodoItem = ({ todo, onToggle, onDelete }) => {
  return (
    <li style={{ margin: "10px 0" }}>
      <span
        style={{
          textDecoration: todo.status ? "line-through" : "none",
          marginRight: "10px",
        }}
        onClick={onToggle}
      >
        {todo.title}
      </span>
      <button onClick={onDelete}>Delete</button>
    </li>
  );
};

export default TodoItem;
