import express from "express";
import { getAllStudents,
    getStudentById,
    createStudent,
    updateStudent,
    patchStudent,
    deleteStudent } from "../controllers/studentController.js";

const router = express.Router();


// GET all students
router.get("/", getAllStudents);

// GET student by ID
router.get("/:id", getStudentById);

// POST new student
router.post("/", createStudent);

// PUT complete student update
router.put("/:id", updateStudent);

// PATCH partial student update
router.patch("/:id", patchStudent);

// DELETE student
router.delete("/:id", deleteStudent);

export default router;