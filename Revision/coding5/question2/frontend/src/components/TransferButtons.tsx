import React from "react";
import API from "../services/api";
import type { Task } from "./TaskList";

interface Props {
  selectedTask: Task | null;
  refresh: () => void;
}

const TransferButtons: React.FC<Props> = ({ selectedTask, refresh }) => {
  const moveTask = async () => {
    if (!selectedTask) return;
    const newStatus =
      selectedTask.status === "pending" ? "completed" : "pending";
    await API.put(`/tasks/${selectedTask._id}`, { status: newStatus });
    refresh();
  };

  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <button
        disabled={!selectedTask}
        onClick={moveTask}
        className="bg-gray-700 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        ⇄ Move
      </button>
    </div>
  );
};

export default TransferButtons;
