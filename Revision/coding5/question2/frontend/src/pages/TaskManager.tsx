import React, { useEffect, useState } from "react";
import API from "../services/api";
import TaskInput from "../components/TaskInput";
import TaskList from "../components/TaskList";
import type { Task } from "../components/TaskList";
import TransferButtons from "../components/TransferButtons";

const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<string | null>(null);

  const fetchTasks = async () => {
    const res = await API.get("/tasks");
    console.log(res.data);
    setTasks(res.data.tasks);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const onDropTask = async (draggedId: string, hoverId: string) => {
    const reordered = [...tasks];
    const draggedIndex = reordered.findIndex((t) => t._id === draggedId);
    const hoverIndex = reordered.findIndex((t) => t._id === hoverId);
    const [removed] = reordered.splice(draggedIndex, 1);
    reordered.splice(hoverIndex, 0, removed);

    setTasks(reordered);

    await Promise.all(
      reordered.map((t, index) => API.put(`/tasks/${t._id}`, { order: index }))
    );
  };

  return (
    <div className="p-8 flex flex-col items-center">
      <TaskInput onTaskAdded={fetchTasks} />
      <div className="flex gap-8">
        <div>
          <h2 className="text-lg font-bold mb-2">Pending Tasks</h2>
          <TaskList
            tasks={tasks.filter((t) => t.status === "pending")}
            onSelect={setSelectedTask}
            selectedTask={selectedTask}
            onDropTask={onDropTask}
          />
        </div>

        <TransferButtons
          selectedTask={tasks.find((t) => t._id === selectedTask) || null}
          refresh={fetchTasks}
        />

        <div>
          <h2 className="text-lg font-bold mb-2">Completed Tasks</h2>
          <TaskList
            tasks={tasks.filter((t) => t.status === "completed")}
            onSelect={setSelectedTask}
            selectedTask={selectedTask}
            onDropTask={() => {}}
          />
        </div>
      </div>
    </div>
  );
};

export default TaskManager;
