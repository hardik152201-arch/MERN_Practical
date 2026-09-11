import student from "../data/student.js";

// GET - Get all students
const getStudents = (req, res) => {
    res.status(200).json({
        success: true,
        count: student.length,
        students: student
    });
};


// GET - Get student by ID
const getStudentById = (req, res) => {
    const id = parseInt(req.params.id);

    const student = student.find(
        student => student.id === id
    );

    if (!student) {
        return res.status(404).json({
            success: false,
            message: "Student not found"
        });
    }

    res.status(200).json({
        success: true,
        student: student
    });
};


// POST - Add new student
const addStudent = (req, res) => {
    const { name, course, age } = req.body;

    // Request validation
    if (!name || !course || !age) {
        return res.status(400).json({
            success: false,
            message: "Name, course and age are required"
        });
    }

    const newStudent = {
        id: student.length + 1,
        name: name,
        course: course,
        age: age
    };

    student.push(newStudent);

    res.status(201).json({
        success: true,
        message: "Student added successfully",
        student: newStudent
    });
};


// PUT - Update student
const updateStudent = (req, res) => {
    const id = parseInt(req.params.id);

    const student = student.find(
        student => student.id === id
    );

    if (!student) {
        return res.status(404).json({
            success: false,
            message: "Student not found"
        });
    }

    const { name, course, age } = req.body;

    student.name = name || student.name;
    student.course = course || student.course;
    student.age = age || student.age;

    res.status(200).json({
        success: true,
        message: "Student updated successfully",
        student: student
    });
};


// DELETE - Delete student
const deleteStudent = (req, res) => {
    const id = parseInt(req.params.id);

    const studentIndex = student.findIndex(
        student => student.id === id
    );

    if (studentIndex === -1) {
        return res.status(404).json({
            success: false,
            message: "Student not found"
        });
    }

    const deletedStudent = student.splice(studentIndex, 1);

    res.status(200).json({
        success: true,
        message: "Student deleted successfully",
        student: deletedStudent[0]
    });
};


export {
    getStudents,
    getStudentById,
    addStudent,
    updateStudent,
    deleteStudent

};