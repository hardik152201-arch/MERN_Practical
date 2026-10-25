import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {

    const [blogs, setBlogs] = useState([]);

    const fetchBlogs = async () => {

        try {

            const response = await axios.get(
                "http://localhost:5000/api/blogs"
            );

            setBlogs(response.data);

        } catch (error) {

            console.error(error);

        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    return (

        <div className="container">

            <h1>Latest Blogs</h1>

            <div className="blog-grid">

                {blogs.map((blog) => (

                    <div
                        className="blog-card"
                        key={blog._id}
                    >

                        {blog.image && (
                            <img
                                src={blog.image}
                                alt={blog.title}
                            />
                        )}

                        <h2>{blog.title}</h2>

                        <p>
                            {blog.content.substring(0, 150)}
                            ...
                        </p>

                        <small>
                            Category: {blog.category}
                        </small>

                        <p>
                            By: {blog.author?.name}
                        </p>

                    </div>

                ))}

            </div>

        </div>
    );
};

export default Home;