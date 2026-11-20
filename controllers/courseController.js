
const Course = require("../models/course")

const createCourse = async (req, res) => {
    try {
        const { title, code, description } = req.body
        const course = await Course.create({ title, code, description })
        res.status(201).json({ message: "Course created", data: course })
    } catch (err) {
        if (err.code === 11000) return res.status(409).json({ message: "Course code already exists" })
        if (err.name === "ValidationError") return res.status(400).json({ message: err.message })
        res.status(500).json({ message: err.message })
    }
}

const getCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id).populate("students", "firstName lastName email phoneNumber")
        if (!course) return res.status(404).json({ message: "Course not found" })
        res.status(200).json({ data: course })
    } catch (err) {
        if (err.name === "CastError") return res.status(400).json({ message: "Invalid ID" })
        res.status(500).json({ message: err.message })
    }
}

module.exports = { createCourse, getCourse }