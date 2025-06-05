import "./App.css";
import { useState } from "react";
import type { Task } from "./types/Task";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const handleAddTask = (task: Task) => {
    setTasks((prev) => [...prev, task]);
  };
  const handleToggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };
  return (
    <>
      <div className="max-w-xl mx-auto mt-10 p-4">
        <h1 className="text-2xl font-bold mb-5">Task Manager</h1>
        <TaskForm onAdd={handleAddTask} />
        <TaskList tasks={tasks} onToggle={handleToggleTask} />
      </div>
    </>
  );
}

export default App;
