import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";

dotenv.config();

const app = express();


// Database
connectDB();


// Middleware
app.use(cors({
    origin: process.env.CLIENT_URL
}));

app.use(express.json());


// Routes
app.use("/api/auth", authRoutes);

app.use("/api/blogs", blogRoutes);


// Test route
app.get("/", (req, res) => {

    res.json({
        message: "Blog Management API is running"
    });

});


// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(
        `Server running at http://localhost:${PORT}`
    );

});