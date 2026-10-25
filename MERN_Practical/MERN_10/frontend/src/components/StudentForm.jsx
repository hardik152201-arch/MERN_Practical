import { useState } from "react";

function StudentForm({ onStudentAdded }) {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        age: "",
        course: ""
    });


    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        await onStudentAdded(formData);

        setFormData({
            name: "",
            email: "",
            age: "",
            course: ""
        });

    };


    return (

        <form onSubmit={handleSubmit} className="student-form">

            <input
                type="text"
                name="name"
                placeholder="Student Name"
                value={formData.name}
                onChange={handleChange}
                required
            />

            <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
            />

            <input
                type="number"
                name="age"
                placeholder="Age"
                value={formData.age}
                onChange={handleChange}
                required
            />

            <input
                type="text"
                name="course"
                placeholder="Course"
                value={formData.course}
                onChange={handleChange}
                required
            />

            <button type="submit">
                Add Student
            </button>

        </form>

    );

}

export default StudentForm;