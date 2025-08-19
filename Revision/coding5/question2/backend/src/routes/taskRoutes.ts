import express from "express";
import {
  addTask,
  deleteTask,
  getTasks,
  updateTak,
} from "../controllers/taskControllers";

const router = express.Router();

router.get("/tasks", getTasks);
router.post("/tasks", addTask);
router.put("/tasks/:id", updateTak);
router.delete("/tasks/:id", deleteTask);

export default router;
