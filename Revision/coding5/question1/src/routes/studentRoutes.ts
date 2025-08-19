import { Router, Request, Response } from "express";
import Student from "../models/Student";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json({ msg: "Student created", student });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    const students = await Student.find();
    res.status(200).json({ msg: "All students", students });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const students = await Student.findById(req.params.id);
    if (!students) return res.status(404).json({ msg: "No student found" });
    res.status(200).json({ msg: "student", students });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
});

export default router;
