import express from "express";
import mongoose from "mongoose";

import dotenv from "dotenv";
import cors from "cors";
import studentRoutes from "./routes/studentRoutes.js";

dotenv.config();

const app = express();


// ==============================
// MIDDLEWARE
// ==============================

app.use(cors());

app.use(express.json());


// ==============================
// DATABASE CONNECTION
// ==============================

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {

        console.log("MongoDB connected successfully");

    })
    .catch((error) => {

        console.log("MongoDB connection failed");

        console.log(error.message);

    });


// ==============================
// ROUTES
// ==============================

app.get("/", (req, res) => {

    res.json({
        message: "Student Management API is running"
    });

});

app.use("/api/students", studentRoutes);


// ==============================
// SERVER
// ==============================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(`Server running on http://localhost:${PORT}`);

});