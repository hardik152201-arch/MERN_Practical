import express from "express";
import studentRoutes from "./routes/studentRoutes.js";
import logger from "./middleware/logger.js";
import notFound from "./middleware/notFound.js";


const app = express();
const PORT = 5000;

// Built-in middleware
app.use(express.json());

// Custom middleware
app.use(logger);

// Home route
app.get("/", (req, res) => {
    res.send("Student Management API is running...");
});

// Student routes
app.use("/api/students", studentRoutes);

// 404 middleware
app.use(notFound);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
