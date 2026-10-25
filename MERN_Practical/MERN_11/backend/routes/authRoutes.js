
import express from "express";

import {
    register,
    login,
    getProfile
} from "../controllers/authController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();


// ==========================================
// USER REGISTRATION
// POST /api/auth/register
// ==========================================

router.post(
    "/register",
    register
);


// ==========================================
// USER LOGIN
// POST /api/auth/login
// ==========================================

router.post(
    "/login",
    login
);


// ==========================================
// GET LOGGED-IN USER PROFILE
// GET /api/auth/profile
// Protected Route
// ==========================================

router.get(
    "/profile",
    protect,
    getProfile
);


export default router;

