
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditBlog = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        content: "",
        category: "",
        image: ""
    });

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    // Fetch existing blog
    const fetchBlog = async () => {
        try {
            const response = await axios.get(
                `http://localhost:5000/api/blogs/${id}`
            );

            const blog = response.data;

            setForm({
                title: blog.title || "",
                content: blog.content || "",
                category: blog.category || "",
                image: blog.image || ""
            });

        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Failed to load blog."
            );

            navigate("/dashboard");

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlog();
    }, [id]);

    // Handle input changes
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    // Update blog
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setSubmitting(true);

            const token = localStorage.getItem("token");

            await axios.put(
                `http://localhost:5000/api/blogs/${id}`,
                form,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            alert("Blog updated successfully!");

            navigate("/dashboard");

        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Failed to update blog."
            );
        } finally {
            setSubmitting(false);
        }
    };

    // Loading screen
    if (loading) {
        return (
            <div className="container">
                <h2>Loading blog...</h2>
            </div>
        );
    }

    return (
        <div className="form-container">

            <h2>Edit Blog</h2>

            <form onSubmit={handleSubmit}>

                {/* Blog Title */}
                <input
                    type="text"
                    name="title"
                    placeholder="Blog Title"
                    value={form.title}
                    onChange={handleChange}
                    required
                />

                {/* Category */}
                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={form.category}
                    onChange={handleChange}
                    required
                />

                {/* Image URL */}
                <input
                    type="url"
                    name="image"
                    placeholder="Image URL"
                    value={form.image}
                    onChange={handleChange}
                />

                {/* Blog Content */}
                <textarea
                    name="content"
                    placeholder="Write your blog content..."
                    value={form.content}
                    onChange={handleChange}
                    rows="12"
                    required
                />

                {/* Buttons */}
                <button
                    type="submit"
                    disabled={submitting}
                >
                    {submitting
                        ? "Updating..."
                        : "Update Blog"}
                </button>

                <button
                    type="button"
                    onClick={() => navigate("/dashboard")}
                    style={{
                        marginTop: "10px"
                    }}
                >
                    Cancel
                </button>

            </form>

        </div>
    );
};

export default EditBlog;

