import React, { useState } from "react";

import API from "../services/api";

interface Props {
  onTaskAdded: () => void;
}

const TaskInput: React.FC<Props> = ({ onTaskAdded }) => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const addTask = async () => {
    try {
      setLoading(true);
      if (!title.trim()) return;
      await API.post("/tasks", { title });
      setTitle("");
      onTaskAdded();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-2 mb-4">
      <input
        type="text"
        className="border p-2 rounded w-full"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter a task"
      />
      <button
        onClick={addTask}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {loading ? "Adding..." : "Add Task"}
      </button>
    </div>
  );
};

export default TaskInput;
