import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    photoURL: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true,
        min: 6
    },
    role: {
        type: String,
        enum: ["user", "creator", "admin"],
        default: "user",
        required: true
    },
    status: {
        type: Boolean,
        default: false,
        required: false
    },
    uid: {
        type: String
    },
    DOB: {
        type: String,
        required: false
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"],
        required: false
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

export const User = mongoose.model("User", UserSchema)