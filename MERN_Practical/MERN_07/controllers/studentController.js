import students from "../data/students.js";

// GET all students
const getAllStudents = (req, res) => {
    res.status(200).json({
        success: true,
        count: students.length,
        data: students
    });
};


// GET student by ID
const getStudentById = (req, res) => {
    const id = parseInt(req.params.id);

    const student = students.find(student => student.id === id);

    if (!student) {
        return res.status(404).json({
            success: false,
            message: "Student not found"
        });
    }

    res.status(200).json({
        success: true,
        data: student
    });
};


// POST create new student
const createStudent = (req, res) => {
    const { name, email, course, age } = req.body;

    // Validation
    if (!name || !email || !course || age === undefined) {
        return res.status(400).json({
            success: false,
            message: "Name, email, course and age are required"
        });
    }

    const existingStudent = students.find(
        student => student.email.toLowerCase() === email.toLowerCase()
    );

    if (existingStudent) {
        return res.status(409).json({
            success: false,
            message: "Student with this email already exists"
        });
    }

    const newStudent = {
        id: students.length > 0
            ? Math.max(...students.map(student => student.id)) + 1
            : 1,
        name,
        email,
        course,
        age: Number(age)
    };

    students.push(newStudent);

    res.status(201).json({
        success: true,
        message: "Student created successfully",
        data: newStudent
    });
};


// PUT update complete student record
const updateStudent = (req, res) => {
    const id = parseInt(req.params.id);

    const studentIndex = students.findIndex(
        student => student.id === id
    );

    if (studentIndex === -1) {
        return res.status(404).json({
            success: false,
            message: "Student not found"
        });
    }

    const { name, email, course, age } = req.body;

    if (!name || !email || !course || age === undefined) {
        return res.status(400).json({
            success: false,
            message: "Name, email, course and age are required"
        });
    }

    students[studentIndex] = {
        id,
        name,
        email,
        course,
        age: Number(age)
    };

    res.status(200).json({
        success: true,
        message: "Student updated successfully",
        data: students[studentIndex]
    });
};


// PATCH update selected fields
const patchStudent = (req, res) => {
    const id = parseInt(req.params.id);

    const student = students.find(student => student.id === id);

    if (!student) {
        return res.status(404).json({
            success: false,
            message: "Student not found"
        });
    }

    const allowedFields = ["name", "email", "course", "age"];

    for (const field of allowedFields) {
        if (req.body[field] !== undefined) {
            student[field] =
                field === "age"
                    ? Number(req.body[field])
                    : req.body[field];
        }
    }

    res.status(200).json({
        success: true,
        message: "Student partially updated successfully",
        data: student
    });
};


// DELETE student
const deleteStudent = (req, res) => {
    const id = parseInt(req.params.id);

    const studentIndex = students.findIndex(
        student => student.id === id
    );

    if (studentIndex === -1) {
        return res.status(404).json({
            success: false,
            message: "Student not found"
        });
    }

    const deletedStudent = students.splice(studentIndex, 1);

    res.status(200).json({
        success: true,
        message: "Student deleted successfully",
        data: deletedStudent[0]
    });
};


export {
    getAllStudents,
    getStudentById,
    createStudent,
    updateStudent,
    patchStudent,
    deleteStudent
};