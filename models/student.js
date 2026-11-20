
const mongoose = require("mongoose")

const studentSchema = new mongoose.Schema({
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    phoneNumber: { type: String, required: true, minlength: 11 },
    password: { type: String, required: true, minlength: 6 },
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
}, { timestamps: true })

module.exports = mongoose.model("Student", studentSchema)