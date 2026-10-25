import express from "express";

import {
    createBlog,
    getBlogs,
    getBlogById,
    updateBlog,
    deleteBlog,
    adminDeleteBlog
} from "../controllers/blogController.js";

import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";

const router = express.Router();


// Public routes
router.get("/", getBlogs);

router.get("/:id", getBlogById);


// Authenticated users
router.post(
    "/",
    protect,
    createBlog
);

router.put(
    "/:id",
    protect,
    updateBlog
);

router.delete(
    "/:id",
    protect,
    deleteBlog
);


// Admin-only route
router.delete(
    "/admin/:id",
    protect,
    authorize("admin"),
    adminDeleteBlog
);

export default router;