import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
    {
        originalName: {
            type: String,
            required: true
        },

        fileName: {
            type: String,
            required: true
        },

        filePath: {
            type: String,
            required: true
        },

        fileType: {
            type: String,
            required: true
        },

        fileSize: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const File = mongoose.model("File", fileSchema);

export default File;