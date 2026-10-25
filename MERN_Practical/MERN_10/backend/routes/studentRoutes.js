import express from "express";
import Student from "../models/Student.js";

const router = express.Router();


// ==============================
// CREATE STUDENT
// ==============================

router.post("/", async (req, res) => {

    try {

        const { name, email, age, course } = req.body;

        const student = new Student({
            name,
            email,
            age,
            course
        });

        const savedStudent = await student.save();

        res.status(201).json({
            success: true,
            message: "Student added successfully",
            student: savedStudent
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

});


// ==============================
// GET ALL STUDENTS
// ==============================

router.get("/", async (req, res) => {

    try {

        const students = await Student.find()
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            students
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

});


// ==============================
// GET SINGLE STUDENT
// ==============================

router.get("/:id", async (req, res) => {

    try {

        const student = await Student.findById(req.params.id);

        if (!student) {

            return res.status(404).json({
                success: false,
                message: "Student not found"
            });

        }

        res.status(200).json({
            success: true,
            student
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

});


// ==============================
// UPDATE STUDENT
// ==============================

router.put("/:id", async (req, res) => {

    try {

        const student = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!student) {

            return res.status(404).json({
                success: false,
                message: "Student not found"
            });

        }

        res.status(200).json({
            success: true,
            message: "Student updated successfully",
            student
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

});


// ==============================
// DELETE STUDENT
// ==============================

router.delete("/:id", async (req, res) => {

    try {

        const student = await Student.findByIdAndDelete(
            req.params.id
        );

        if (!student) {

            return res.status(404).json({
                success: false,
                message: "Student not found"
            });

        }

        res.status(200).json({
            success: true,
            message: "Student deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

});


export default router;