import multer from "multer";
import File from "../models/File.js";


// ===============================
// Multer Storage Configuration
// ===============================

const storage = multer.diskStorage({

    destination: (req, file, cb) => {

        cb(null, "uploads/");

    },

    filename: (req, file, cb) => {

        const uniqueName =
            Date.now() + "-" + file.originalname;

        cb(null, uniqueName);

    }

});


// ===============================
// File Type Validation
// ===============================

const fileFilter = (req, file, cb) => {

    const allowedTypes = [

        "image/jpeg",
        "image/png",
        "image/jpg",
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"

    ];


    if (allowedTypes.includes(file.mimetype)) {

        cb(null, true);

    } else {

        cb(
            new Error(
                "Only JPG, PNG, PDF, DOC and DOCX files are allowed"
            ),
            false
        );

    }

};


// ===============================
// Multer Configuration
// ===============================

export const upload = multer({

    storage: storage,

    fileFilter: fileFilter,

    limits: {

        fileSize: 5 * 1024 * 1024

    }

});


// ===============================
// Upload File
// ===============================

export const uploadFile = async (req, res) => {

    try {

        if (!req.file) {

            return res.status(400).json({

                success: false,

                message: "Please select a file"

            });

        }


        const fileData = new File({

            originalName: req.file.originalname,

            fileName: req.file.filename,

            filePath: req.file.path,

            fileType: req.file.mimetype,

            fileSize: req.file.size

        });


        const savedFile = await fileData.save();


        res.status(201).json({

            success: true,

            message: "File uploaded successfully",

            file: savedFile

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: "File upload failed",

            error: error.message

        });

    }

};


// ===============================
// Get All Uploaded Files
// ===============================

export const getFiles = async (req, res) => {

    try {

        const files = await File.find()
            .sort({ createdAt: -1 });


        res.status(200).json({

            success: true,

            count: files.length,

            files: files

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: "Unable to fetch files",

            error: error.message

        });

    }

};