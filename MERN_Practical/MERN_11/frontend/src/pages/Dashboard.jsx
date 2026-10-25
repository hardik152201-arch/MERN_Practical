import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Dashboard = () => {

    const [blogs, setBlogs] = useState([]);

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    const fetchBlogs = async () => {

        const response = await axios.get(
            "http://localhost:5000/api/blogs"
        );

        setBlogs(response.data);
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    const deleteBlog = async (id) => {

        if (!window.confirm(
            "Are you sure you want to delete this blog?"
        )) {
            return;
        }

        try {

            const token = localStorage.getItem("token");

            await axios.delete(
                `http://localhost:5000/api/blogs/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            fetchBlogs();

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Delete failed"
            );

        }
    };

    const myBlogs = blogs.filter(
        (blog) =>
            blog.author?._id === user?.id
    );

    return (

        <div className="container">

            <h1>My Dashboard</h1>

            <h3>
                Welcome, {user?.name}
            </h3>

            <p>
                Role: <strong>{user?.role}</strong>
            </p>

            {myBlogs.map((blog) => (

                <div
                    className="dashboard-card"
                    key={blog._id}
                >

                    <h2>{blog.title}</h2>

                    <p>{blog.category}</p>

                    <Link to={`/edit/${blog._id}`}>
                        Edit
                    </Link>

                    <button
                        onClick={() =>
                            deleteBlog(blog._id)
                        }
                    >
                        Delete
                    </button>

                </div>

            ))}

        </div>
    );
};

export default Dashboard;