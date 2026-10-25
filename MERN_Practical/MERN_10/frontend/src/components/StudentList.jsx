function StudentList({ students, onDelete }) {

    return (

        <div className="student-list">

            <h2>Student Records</h2>

            {students.length === 0 ? (

                <p>No students found.</p>

            ) : (

                <table>

                    <thead>

                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Age</th>
                            <th>Course</th>
                            <th>Action</th>
                        </tr>

                    </thead>

                    <tbody>

                        {students.map((student) => (

                            <tr key={student._id}>

                                <td>{student.name}</td>

                                <td>{student.email}</td>

                                <td>{student.age}</td>

                                <td>{student.course}</td>

                                <td>

                                    <button
                                        onClick={() =>
                                            onDelete(student._id)
                                        }
                                    >
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

export default StudentList;