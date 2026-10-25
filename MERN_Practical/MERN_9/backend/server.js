import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./config/db.js";

import fileRoutes from "./routes/fileRoutes.js";


dotenv.config();


// ===============================
// __dirname for ES Modules
// ===============================

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);


// ===============================
// MongoDB Connection
// ===============================

connectDB();


// ===============================
// Express App
// ===============================

const app = express();


// ===============================
// Middleware
// ===============================

app.use(cors());

app.use(express.json());


// ===============================
// Static Upload Folder
// ===============================

app.use(
    "/uploads",
    express.static(
        path.join(__dirname, "uploads")
    )
);


// ===============================
// File Routes
// ===============================

app.use(
    "/api/files",
    fileRoutes
);


// ===============================
// Test Route
// ===============================

app.get("/", (req, res) => {

    res.json({

        success: true,

        message: "File Upload API is running"

    });

});


// ===============================
// Error Handler
// ===============================

app.use((error, req, res, next) => {

    console.error(error);

    res.status(400).json({

        success: false,

        message: error.message

    });

});


// ===============================
// Server
// ===============================
const PORT = process.env.PORT ||8000;


app.listen(PORT, () => {

    console.log(
        `Server running on http://localhost:${PORT}`
    );

});