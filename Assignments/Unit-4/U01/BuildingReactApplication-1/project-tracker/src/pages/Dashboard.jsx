import React from "react";
import { getProjects, deleteProject } from "../services/firebaseService";
import { useState } from "react";
import { useEffect } from "react";

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadProjects = async () => {
    const data = await getProjects();
    setProjects(data);
    setLoading(false);
  };
  const handleDelete = async (id) => {
    if (confirm("Delete this project?")) {
      await deleteProject(id);
      loadProjects(); // refresh list
    }
  };
  useEffect(() => {
    loadProjects();
  }, []);
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Projects</h1>
        <Link
          to="/projects/add"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          + New Project
        </Link>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : projects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        <ul className="space-y-4">
          {projects.map((project) => (
            <li
              key={project.id}
              className="border p-4 rounded shadow flex justify-between items-center"
            >
              <div>
                <h2 className="text-lg font-semibold">{project.title}</h2>
                <p className="text-sm text-gray-600">{project.description}</p>
              </div>
              <div className="flex gap-2">
                <Link
                  to={`/projects/${project.id}`}
                  className="text-blue-600 underline"
                >
                  View
                </Link>
                <Link
                  to={`/projects/edit/${project.id}`}
                  className="text-yellow-600 underline"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="text-red-600 underline"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;
