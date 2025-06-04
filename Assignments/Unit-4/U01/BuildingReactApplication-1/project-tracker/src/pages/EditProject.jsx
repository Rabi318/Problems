import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProjectById, updateProject } from "../services/firebaseService";

const EditProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProject = async () => {
      try {
        const project = await getProjectById(id);
        setTitle(project.title);
        setDescription(project.description);
        setLoading(false);
      } catch (err) {
        alert("Project not found.");
        console.error(err);
        navigate("/dashboard");
      }
    };

    loadProject();
  }, [id, navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateProject(id, {
        title,
        description,
        updatedAt: new Date().toISOString(),
      });
      navigate("/dashboard");
    } catch (err) {
      alert("Failed to update project");
      console.error(err);
    }
  };

  if (loading) return <p className="text-center mt-6">Loading project...</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Edit Project</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
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
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Update Project
        </button>
      </form>
    </div>
  );
};

export default EditProject;
