import express from "express";

import {
    upload,
    uploadFile,
    getFiles
} from "../controllers/fileController.js";


const router = express.Router();


// Upload single file

router.post(
    "/upload",
    upload.single("file"),
    uploadFile
);


// Get all uploaded files

router.get(
    "/",
    getFiles
);


export default router;