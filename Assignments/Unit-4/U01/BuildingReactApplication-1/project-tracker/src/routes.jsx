import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import AddProject from "./pages/AddProject";
import EditProject from "./pages/EditProject";
import ProjectDetails from "./pages/ProjectDetails";
import PrivateRoute from "./components/PrivateRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/projects/add"
        element={
          <PrivateRoute>
            <AddProject />
          </PrivateRoute>
        }
      />
      <Route
        path="/projects/edit/:id"
        element={
          <PrivateRoute>
            <EditProject />
          </PrivateRoute>
        }
      />
      <Route
        path="/projects/:id"
        element={
          <PrivateRoute>
            <ProjectDetails />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
