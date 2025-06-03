import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../features/tasks/taskSlice";

const TaskInput = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const handleAdd = () => {
    if (text.trim() !== "") {
      dispatch(addTask(text));
      setText("");
    }
  };

  return (
    <div>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter a task"
      />
      <button onClick={handleAdd}>Add Task</button>
    </div>
  );
};

export default TaskInput;
