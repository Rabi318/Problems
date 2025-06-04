import axios from "axios";

const DB_URL = import.meta.env.VITE_FIREBASE_DATABASE_URL;

export const getProjects = async () => {
  const res = await axios.get(`${DB_URL}/projects.json`);
  const projects = res.data || {};
  return Object.keys(projects).map((id) => ({ id, ...projects[id] }));
};

export const addProject = async (project) => {
  return await axios.post(`${DB_URL}/projects.json`, project);
};

export const updateProject = async (id, project) => {
  return await axios.put(`${DB_URL}/projects/${id}.json`, project);
};

export const deleteProject = async (id) => {
  return await axios.delete(`${DB_URL}/projects/${id}.json`);
};

export const getProjectById = async (id) => {
  const res = await axios.get(`${DB_URL}/projects/${id}.json`);
  return { id, ...res.data };
};

// 🔹 Task Functions

export const addTaskToProject = async (projectId, task) => {
  return await axios.post(`${DB_URL}/projects/${projectId}/tasks.json`, task);
};

export const updateTaskInProject = async (projectId, taskId, task) => {
  return await axios.put(
    `${DB_URL}/projects/${projectId}/tasks/${taskId}.json`,
    task
  );
};

export const deleteTaskFromProject = async (projectId, taskId) => {
  return await axios.delete(
    `${DB_URL}/projects/${projectId}/tasks/${taskId}.json`
  );
};
