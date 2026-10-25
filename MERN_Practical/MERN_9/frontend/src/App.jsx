import { useEffect, useState } from "react";
import axios from "axios";

import "./App.css";


const API_URL = "http://localhost:5000/api/files";

const SERVER_URL = "http://localhost:5000";


function App() {

    // ===============================
    // States
    // ===============================

    const [selectedFile, setSelectedFile] = useState(null);

    const [files, setFiles] = useState([]);

    const [uploading, setUploading] = useState(false);

    const [progress, setProgress] = useState(0);

    const [message, setMessage] = useState("");

    const [error, setError] = useState("");


    // ===============================
    // Allowed File Types
    // ===============================

    const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/jpg",
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ];


    // ===============================
    // Get Files
    // ===============================

    const fetchFiles = async () => {

        try {

            const response = await axios.get(API_URL);

            setFiles(response.data.files);

        }

        catch (error) {

            console.error(error);

            setError(
                "Unable to load uploaded files."
            );

        }

    };


    // ===============================
    // Load Files on Page Load
    // ===============================

    useEffect(() => {

        fetchFiles();

    }, []);


    // ===============================
    // File Selection
    // ===============================

    const handleFileChange = (event) => {

        const file = event.target.files[0];

        setMessage("");

        setError("");

        setProgress(0);


        if (!file) {

            setSelectedFile(null);

            return;

        }


        // Check file type

        if (!allowedTypes.includes(file.type)) {

            setError(
                "Only JPG, PNG, PDF, DOC and DOCX files are allowed."
            );

            setSelectedFile(null);

            return;

        }


        // Check file size

        if (file.size > 5 * 1024 * 1024) {

            setError(
                "File size must be less than 5 MB."
            );

            setSelectedFile(null);

            return;

        }


        setSelectedFile(file);

    };


    // ===============================
    // Upload File
    // ===============================

    const handleUpload = async () => {

        if (!selectedFile) {

            setError(
                "Please select a file first."
            );

            return;

        }


        try {

            setUploading(true);

            setMessage("");

            setError("");

            setProgress(0);


            // Create FormData

            const formData = new FormData();

            formData.append(
                "file",
                selectedFile
            );


            // Send file to backend

            const response = await axios.post(
                `${API_URL}/upload`,
                formData,
                {
                    headers: {
                        "Content-Type":
                            "multipart/form-data"
                    },

                    onUploadProgress: (progressEvent) => {

                        const percent =
                            Math.round(
                                (progressEvent.loaded * 100) /
                                progressEvent.total
                            );

                        setProgress(percent);

                    }
                }
            );


            if (response.data.success) {

                setMessage(
                    "File uploaded successfully!"
                );

                setSelectedFile(null);

                setProgress(100);

                // Reset file input

                document.getElementById(
                    "fileInput"
                ).value = "";


                // Refresh file list

                fetchFiles();

            }

        }

        catch (error) {

            console.error(error);

            setError(
                error.response?.data?.message ||
                "File upload failed."
            );

        }

        finally {

            setUploading(false);

        }

    };


    // ===============================
    // Format File Size
    // ===============================

    const formatFileSize = (bytes) => {

        if (bytes < 1024) {

            return `${bytes} B`;

        }

        if (bytes < 1024 * 1024) {

            return `${(
                bytes / 1024
            ).toFixed(2)} KB`;

        }

        return `${(
            bytes /
            (1024 * 1024)
        ).toFixed(2)} MB`;

    };


    // ===============================
    // Format Date
    // ===============================

    const formatDate = (date) => {

        return new Date(date)
            .toLocaleString();

    };


    // ===============================
    // UI
    // ===============================

    return (

        <div className="app">

            {/* ===============================
                Header
            =============================== */}

            <header className="header">

                <div>

                    <h1>
                        File Upload Module
                    </h1>

                    <p>
                        React + Express + Multer + MongoDB
                    </p>

                </div>

            </header>


            {/* ===============================
                Main
            =============================== */}

            <main className="container">


                {/* ===============================
                    Upload Card
                =============================== */}

                <section className="upload-card">

                    <h2>
                        Upload File
                    </h2>

                    <p className="description">
                        Select a JPG, PNG, PDF, DOC or DOCX
                        file. Maximum size is 5 MB.
                    </p>


                    {/* File Input */}

                    <div className="file-box">

                        <input
                            id="fileInput"
                            type="file"
                            accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                            onChange={handleFileChange}
                        />

                    </div>


                    {/* Selected File */}

                    {selectedFile && (

                        <div className="selected-file">

                            <div>

                                <strong>
                                    Selected File
                                </strong>

                                <p>
                                    {selectedFile.name}
                                </p>

                            </div>

                            <span>
                                {formatFileSize(
                                    selectedFile.size
                                )}
                            </span>

                        </div>

                    )}


                    {/* Error */}

                    {error && (

                        <div className="error-message">

                            {error}

                        </div>

                    )}


                    {/* Success */}

                    {message && (

                        <div className="success-message">

                            {message}

                        </div>

                    )}


                    {/* Progress */}

                    {uploading && (

                        <div className="progress-container">

                            <div className="progress-header">

                                <span>
                                    Uploading...
                                </span>

                                <span>
                                    {progress}%
                                </span>

                            </div>

                            <div className="progress-bar">

                                <div
                                    className="progress"
                                    style={{
                                        width:
                                            `${progress}%`
                                    }}
                                />

                            </div>

                        </div>

                    )}


                    {/* Upload Button */}

                    <button
                        className="upload-button"
                        onClick={handleUpload}
                        disabled={
                            uploading ||
                            !selectedFile
                        }
                    >

                        {uploading
                            ? "Uploading..."
                            : "Upload File"
                        }

                    </button>

                </section>


                {/* ===============================
                    Uploaded Files
                =============================== */}

                <section className="files-card">

                    <div className="files-header">

                        <div>

                            <h2>
                                Uploaded Files
                            </h2>

                            <p>
                                {files.length} file
                                {files.length !== 1
                                    ? "s"
                                    : ""
                                } uploaded
                            </p>

                        </div>

                        <button
                            className="refresh-button"
                            onClick={fetchFiles}
                        >
                            Refresh
                        </button>

                    </div>


                    {/* No Files */}

                    {files.length === 0 ? (

                        <div className="empty">

                            <div className="empty-icon">
                                📁
                            </div>

                            <h3>
                                No files uploaded
                            </h3>

                            <p>
                                Upload your first file
                                using the form above.
                            </p>

                        </div>

                    ) : (

                        <div className="table-container">

                            <table>

                                <thead>

                                    <tr>

                                        <th>
                                            File Name
                                        </th>

                                        <th>
                                            Type
                                        </th>

                                        <th>
                                            Size
                                        </th>

                                        <th>
                                            Upload Date
                                        </th>

                                        <th>
                                            Action
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {files.map((file) => (

                                        <tr
                                            key={file._id}
                                        >

                                            <td>

                                                <div className="file-name">

                                                    <span className="file-icon">
                                                        📄
                                                    </span>

                                                    <span>
                                                        {file.originalName}
                                                    </span>

                                                </div>

                                            </td>


                                            <td>

                                                {file.fileType}

                                            </td>


                                            <td>

                                                {formatFileSize(
                                                    file.fileSize
                                                )}

                                            </td>


                                            <td>

                                                {formatDate(
                                                    file.createdAt
                                                )}

                                            </td>


                                            <td>

                                                <a
                                                    href={`${SERVER_URL}/${file.filePath}`}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="view-button"
                                                >
                                                    View
                                                </a>

                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        </div>

                    )}

                </section>

            </main>


            {/* ===============================
                Footer
            =============================== */}

            <footer>

                <p>
                    File Upload Module • MERN Practical
                </p>

            </footer>

        </div>

    );

}


export default App;