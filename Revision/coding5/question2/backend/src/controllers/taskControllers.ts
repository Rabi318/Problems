import { Request, Response } from "express";

import Task from "../models/Task";

export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find().sort({ order: 1 });
    res.json({ msg: "All tasks", tasks });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something went wrong" });
  }
};

export const addTask = async (req: Request, res: Response) => {
  try {
    const { title } = req.body;
    const count = await Task.countDocuments();
    const task = new Task({ title, order: count });
    await task.save();
    res.json({ msg: "Task added", task });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something went wrong" });
  }
};

export const updateTak = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status, order } = req.body;
    const task = await Task.findByIdAndUpdate(
      id,
      { status, order },
      { new: true }
    );
    res.json({ msg: "Task updated", task });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something went wrong" });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.json({ msg: "Task deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something went wrong" });
  }
};
