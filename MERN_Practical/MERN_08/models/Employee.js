import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        phone: {
            type: String,
            required: true
        },

        department: {
            type: String,
            required: true
        },

        designation: {
            type: String,
            required: true
        },

        salary: {
            type: Number,
            required: true,
            min: 0
        },

        joiningDate: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true
    }
);

export const Employee = mongoose.model("Employee", employeeSchema);