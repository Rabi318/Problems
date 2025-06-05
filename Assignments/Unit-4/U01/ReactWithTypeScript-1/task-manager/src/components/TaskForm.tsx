import React, { useState } from "react";
import { Priority, type Task } from "../types/Task";

interface TaskFormProps {
  onAdd: (task: Task) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAdd }) => {
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Priority>(Priority.LOW);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;
    const newTask: Task = {
      id: Date.now(),
      description,
      priority,
      completed: false,
    };
    onAdd(newTask);
    setDescription("");
    setPriority(Priority.LOW);
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 mb-5">
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter task description"
        className="p-2 border rounded"
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value as Priority)}
        className="p-2 border rounded"
      >
        {Object.values(Priority).map((p) => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
      </select>
      <button className="bg-blue-500 text-white py-2 px-4 rounded">
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
