import { useEffect, useState } from "react";

import axios from "axios";

import StudentForm from "./components/StudentForm";

import StudentList from "./components/StudentList";

import "./App.css";


const API_URL = "http://localhost:8000/api/students";


function App() {

    const [students, setStudents] = useState([]);


    // ==============================
    // GET STUDENTS
    // ==============================

    const fetchStudents = async () => {

        try {

            const response = await axios.get(API_URL);

            setStudents(response.data.students);

        } catch (error) {

            console.log(error);

        }

    };


    // ==============================
    // ADD STUDENT
    // ==============================

    const addStudent = async (student) => {

        try {

            await axios.post(API_URL, student);

            fetchStudents();

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Failed to add student"
            );

        }

    };


    // ==============================
    // DELETE STUDENT
    // ==============================

    const deleteStudent = async (id) => {

        try {

            await axios.delete(`${API_URL}/${id}`);

            fetchStudents();

        } catch (error) {

            console.log(error);

        }

    };


    // ==============================
    // LOAD DATA
    // ==============================

    useEffect(() => {

        fetchStudents();

    }, []);


    return (

        <div className="container">

            <h1>
                Student Management System
            </h1>

            <StudentForm
                onStudentAdded={addStudent}
            />

            <StudentList
                students={students}
                onDelete={deleteStudent}
            />

        </div>

    );

}

export default App;