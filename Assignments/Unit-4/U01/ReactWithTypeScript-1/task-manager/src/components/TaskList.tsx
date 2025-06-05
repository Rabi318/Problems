import React, { useState } from "react";
import type { Task } from "../types/Task";
import TaskItem from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: number) => void;
}

type Filter = "all" | "completed" | "incomplete";

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggle }) => {
  const [filter, setFilter] = useState<Filter>("all");
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "incomplete") return !task.completed;
    return task;
  });
  return (
    <div>
      <div className="flex gap-3 mb-3">
        {(["all", "completed", "incomplete"] as Filter[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 border rounded ${
              filter === f ? "bg-blue-500 text-white" : ""
            }`}
          >
            {f}
          </button>
        ))}
      </div>
      {filteredTasks.map((task) => (
        <TaskItem key={task.id} task={task} onToggle={onToggle} />
      ))}
    </div>
  );
};

export default TaskList;
