import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import employeeRoutes from "./routes/employeeRoutes.js";

// Load environment variables
dotenv.config();

// Connect MongoDB Atlas
connectDB();

const app = express();

// ==============================
// Middleware
// ==============================

app.use(cors());
app.use(express.json());


// ==============================
// Home Route
// ==============================

app.get("/", (req, res) => {
    res.json({
        message: "Employee Management API is running"
    });
});


// ==============================
// Employee Routes
// ==============================

app.use("/api/employees", employeeRoutes);


// ==============================
// 404 Handler
// ==============================

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});


// ==============================
// Start Server
// ==============================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});