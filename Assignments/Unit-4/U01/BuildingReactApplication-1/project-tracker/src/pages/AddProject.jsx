import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addProject } from "../services/firebaseService";

const AddProject = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProject = {
      title,
      description,
      createdAt: new Date().toISOString(),
      tasks: {}, // empty task list initially
    };

    try {
      await addProject(newProject);
      navigate("/dashboard");
    } catch (err) {
      alert("Error adding project");
      console.error(err);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Add New Project</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full border p-2 rounded"
        />
        <textarea
          placeholder="Project Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Create Project
        </button>
      </form>
    </div>
  );
};

export default AddProject;
