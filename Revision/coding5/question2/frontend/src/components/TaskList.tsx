import React from "react";
import { useDrag, useDrop } from "react-dnd";

export interface Task {
  _id: string;
  title: string;
  status: "pending" | "completed";
  order: number;
}

interface Props {
  tasks: Task[];
  onSelect: (id: string) => void;
  selectedTask: string | null;
  onDropTask: (draggedId: string, hoverId: string) => void;
}

const TaskList: React.FC<Props> = ({
  tasks,
  onSelect,
  selectedTask,
  onDropTask,
}) => {
  return (
    <div className="border rounded p-4 min-h-[200px]">
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          isSelected={selectedTask === task._id}
          onSelect={onSelect}
          onDropTask={onDropTask}
        />
      ))}
    </div>
  );
};

const TaskItem: React.FC<{
  task: Task;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onDropTask: (draggedId: string, hoverId: string) => void;
}> = ({ task, isSelected, onSelect, onDropTask }) => {
  const [, dragRef] = useDrag({
    type: "TASK",
    item: { id: task._id },
  });

  const [, dropRef] = useDrop({
    accept: "TASK",
    hover: (item: { id: string }) => {
      if (item.id !== task._id) {
        onDropTask(item.id, task._id);
      }
    },
  });

  return (
    <div
      ref={(node) => {
        if (node) dragRef(dropRef(node));
      }}
      onClick={() => onSelect(task._id)}
      className={`p-2 mb-2 rounded cursor-pointer ${
        task.status === "pending" ? "text-red-500" : "text-green-500"
      } ${isSelected ? "border-2 border-blue-500" : "border"}`}
    >
      {task.title}
    </div>
  );
};

export default TaskList;
