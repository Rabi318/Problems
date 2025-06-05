import React from "react";
import type { Task } from "../types/Task";

interface TaskItemProps {
  task: Task;
  onToggle: (id: number) => void;
}
const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle }) => {
  return (
    <div className="flex justify-between items-center border p-2 rounded mb-2">
      <div>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="mr-2"
        />
        <span className={`${task.completed ? "line-through" : ""}`}>
          {task.description}{" "}
          <span className="text-sm text-gray-500">({task.priority})</span>
        </span>
      </div>
    </div>
  );
};

export default TaskItem;
