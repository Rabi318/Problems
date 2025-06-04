import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import {
  getProjectById,
  addTaskToProject,
  updateTaskInProject,
  deleteTaskFromProject,
} from "../services/firebaseService";

// Debounce utility
const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  // Task states
  const [newTask, setNewTask] = useState("");
  const [priority, setPriority] = useState("low");

  // Filter & search & pagination
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleTasks, setVisibleTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const tasksPerPage = 5;

  // Load project with tasks
  const loadProject = async () => {
    const data = await getProjectById(id);
    setProject(data);
  };

  useEffect(() => {
    loadProject();
  }, [id]);

  // Add new task handler
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    const task = {
      title: newTask,
      completed: false,
      priority,
      createdAt: new Date().toISOString(),
    };
    await addTaskToProject(id, task);
    setNewTask("");
    await loadProject();
  };

  // Toggle task completion
  const handleToggleComplete = async (taskId, task) => {
    await updateTaskInProject(id, taskId, {
      ...task,
      completed: !task.completed,
    });
    await loadProject();
  };

  // Delete task handler
  const handleDeleteTask = async (taskId) => {
    await deleteTaskFromProject(id, taskId);
    await loadProject();
  };

  // Get filtered tasks based on filter (completion/priority)
  const getFilteredTasks = useCallback(() => {
    if (!project?.tasks) return [];
    return (
      Object.entries(project.tasks)
        .filter(([_, task]) => {
          if (filter === "all") return true;
          if (filter === "completed") return task.completed;
          if (filter === "incomplete") return !task.completed;
          if (["high", "medium", "low"].includes(filter))
            return task.priority === filter;
          return true;
        })
        // Sort by createdAt descending
        .sort((a, b) => new Date(b[1].createdAt) - new Date(a[1].createdAt))
    );
  }, [project, filter]);

  // Debounced search effect
  useEffect(() => {
    const debouncedFilter = debounce(() => {
      const filtered = getFilteredTasks().filter(([_, task]) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setVisibleTasks(filtered);
      setCurrentPage(1); // reset to first page on search/filter change
    }, 300);

    debouncedFilter();

    // Cleanup debounce timer on unmount/change
    return () => clearTimeout(debouncedFilter);
  }, [searchTerm, getFilteredTasks]);

  // Pagination slicing
  const paginatedTasks = visibleTasks.slice(
    (currentPage - 1) * tasksPerPage,
    currentPage * tasksPerPage
  );

  if (!project) return <p className="p-4">Loading project...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-2">{project.title}</h2>
      <p className="text-gray-700 mb-4">{project.description}</p>

      {/* Add Task */}
      <form onSubmit={handleAddTask} className="flex gap-2 mb-4">
        <input
          type="text"
          className="flex-1 border rounded p-2"
          placeholder="New task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="border rounded p-2"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button className="bg-green-600 text-white px-4 rounded">Add</button>
      </form>

      {/* Filters & Search */}
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <label className="mr-2 font-semibold">Filter:</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border p-1 rounded"
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="incomplete">Incomplete</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>
        </div>

        <input
          type="text"
          placeholder="Search tasks..."
          className="border p-2 rounded flex-1 max-w-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Task List */}
      {visibleTasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <ul className="space-y-2">
          {paginatedTasks.map(([taskId, task]) => (
            <li
              key={taskId}
              className="flex justify-between items-center border p-2 rounded"
            >
              <div>
                <p
                  className={`${
                    task.completed ? "line-through text-gray-500" : ""
                  }`}
                >
                  {task.title}
                </p>
                <small className="text-xs text-gray-500">
                  Priority: {task.priority}
                </small>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleToggleComplete(taskId, task)}
                  className="text-sm text-blue-500 hover:underline"
                >
                  {task.completed ? "Undo" : "Done"}
                </button>
                <button
                  onClick={() => handleDeleteTask(taskId)}
                  className="text-sm text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Pagination Controls */}
      {visibleTasks.length > tasksPerPage && (
        <div className="mt-4 flex justify-center gap-2">
          {Array.from(
            { length: Math.ceil(visibleTasks.length / tasksPerPage) },
            (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 border rounded ${
                  currentPage === i + 1 ? "bg-blue-500 text-white" : ""
                }`}
              >
                {i + 1}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;
