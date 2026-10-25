import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        content: "",
        category: "",
        image: ""
    });

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const token = localStorage.getItem("token");

            await axios.post(
                "http://localhost:5000/api/blogs",
                form,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Blog created successfully!");

            navigate("/");

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Failed to create blog"
            );

        }
    };

    return (

        <div className="form-container">

            <h2>Create New Blog</h2>

            <form onSubmit={handleSubmit}>

                <input
                    name="title"
                    placeholder="Blog Title"
                    value={form.title}
                    onChange={handleChange}
                    required
                />

                <input
                    name="category"
                    placeholder="Category"
                    value={form.category}
                    onChange={handleChange}
                    required
                />

                <input
                    name="image"
                    placeholder="Image URL"
                    value={form.image}
                    onChange={handleChange}
                />

                <textarea
                    name="content"
                    placeholder="Write your blog..."
                    value={form.content}
                    onChange={handleChange}
                    rows="10"
                    required
                />

                <button type="submit">
                    Publish Blog
                </button>

            </form>

        </div>
    );
};

export default CreateBlog;