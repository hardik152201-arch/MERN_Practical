import express from "express";
import { getStudents,
    getStudentById,
    addStudent,
    updateStudent,
    deleteStudent } from "../controller/studentController.js";

const router = express.Router();

// GET - Get all students
router.get("/", getStudents);

// GET - Get student by ID
router.get("/:id", getStudentById);

// POST - Add new student
router.post("/", addStudent);

// PUT - Update student
router.put("/:id", updateStudent);

// DELETE - Delete student
router.delete("/:id", deleteStudent);

export default router;