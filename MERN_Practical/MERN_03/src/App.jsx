import { useState } from "react";
import "./App.css";

function App() {
  const [student, setStudent] = useState({
    name: "",
    email: "",
    age: "",
    course: "",
    mobile: ""
  });

  const [students, setStudents] = useState([]);
  const [error, setError] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value
    });
  };

  // Form validation
  const validateForm = () => {
    if (!student.name || !student.email || !student.age ||
        !student.course || !student.mobile) {
      return "All fields are required.";
    }

    if (student.age < 18 || student.age > 60) {
      return "Age must be between 18 and 60.";
    }

    if (!student.mobile.match(/^[0-9]{10}$/)) {
      return "Mobile number must contain 10 digits.";
    }

    if (!student.email.includes("@")) {
      return "Enter a valid email address.";
    }

    return "";
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    setStudents([...students, student]);

    setStudent({
      name: "",
      email: "",
      age: "",
      course: "",
      mobile: ""
    });

    setError("");
  };

  // Delete student
  const deleteStudent = (index) => {
    const updatedStudents = students.filter(
      (_, i) => i !== index
    );

    setStudents(updatedStudents);
  };

  return (
    <div className="container">
      <h1>Student Management System</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter Student Name"
          value={student.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={student.email}
          onChange={handleChange}
        />

        <input
          type="number"
          name="age"
          placeholder="Enter Age"
          value={student.age}
          onChange={handleChange}
        />

        <select
          name="course"
          value={student.course}
          onChange={handleChange}
        >
          <option value="">Select Course</option>
          <option value="MERN Stack">MERN Stack</option>
          <option value="Python">Python</option>
          <option value="Java">Java</option>
          <option value="Data Science">Data Science</option>
        </select>

        <input
          type="text"
          name="mobile"
          placeholder="Enter Mobile Number"
          value={student.mobile}
          onChange={handleChange}
        />

        {error && <p className="error">{error}</p>}

        <button type="submit">Add Student</button>
      </form>

      <h2>Student List</h2>

      {students.length === 0 ? (
        <p>No students added yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Course</th>
              <th>Mobile</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {students.map((student, index) => (
              <tr key={index}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.age}</td>
                <td>{student.course}</td>
                <td>{student.mobile}</td>
                <td>
                  <button onClick={() => deleteStudent(index)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;