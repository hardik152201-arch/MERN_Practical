import Blog from "../models/Blog.js";


// CREATE BLOG
export const createBlog = async (req, res) => {

    try {

        const { title, content, category, image } = req.body;

        const blog = await Blog.create({
            title,
            content,
            category,
            image,
            author: req.user._id
        });

        const populatedBlog = await blog.populate(
            "author",
            "name email"
        );

        res.status(201).json({
            message: "Blog created successfully.",
            blog: populatedBlog
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};


// READ ALL BLOGS
export const getBlogs = async (req, res) => {

    try {

        const blogs = await Blog.find()
            .populate("author", "name email")
            .sort({ createdAt: -1 });

        res.json(blogs);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};


// READ SINGLE BLOG
export const getBlogById = async (req, res) => {

    try {

        const blog = await Blog.findById(req.params.id)
            .populate("author", "name email");

        if (!blog) {
            return res.status(404).json({
                message: "Blog not found."
            });
        }

        res.json(blog);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};


// UPDATE BLOG
export const updateBlog = async (req, res) => {

    try {

        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({
                message: "Blog not found."
            });
        }

        const isAuthor =
            blog.author.toString() === req.user._id.toString();

        const isAdmin = req.user.role === "admin";

        if (!isAuthor && !isAdmin) {
            return res.status(403).json({
                message: "You can only update your own blog."
            });
        }

        const updatedBlog = await Blog.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        ).populate("author", "name email");

        res.json({
            message: "Blog updated successfully.",
            blog: updatedBlog
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};


// DELETE BLOG
export const deleteBlog = async (req, res) => {

    try {

        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({
                message: "Blog not found."
            });
        }

        const isAuthor =
            blog.author.toString() === req.user._id.toString();

        const isAdmin = req.user.role === "admin";

        if (!isAuthor && !isAdmin) {
            return res.status(403).json({
                message: "You can only delete your own blog."
            });
        }

        await Blog.findByIdAndDelete(req.params.id);

        res.json({
            message: "Blog deleted successfully."
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};


// ADMIN: DELETE ANY BLOG
export const adminDeleteBlog = async (req, res) => {

    try {

        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({
                message: "Blog not found."
            });
        }

        await Blog.findByIdAndDelete(req.params.id);

        res.json({
            message: "Blog deleted by admin successfully."
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};