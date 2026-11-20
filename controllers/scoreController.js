
const Score = require("../models/score")
const Student = require("../models/student")
const Course = require("../models/course")

const createScore = async (req, res) => {
    try {
        const { student, course, caScore, examScore } = req.body

        if (!student || !course) {
            return res.status(400).json({ message: "student and course are required" })
        }
        const studentDoc = await Student.findById(student)
        if (!studentDoc) return res.status(404).json({ message: "Student not found" })
        const courseDoc = await Course.findById(course)
        if (!courseDoc) return res.status(404).json({ message: "Course not found" })
        if (!studentDoc.courses.some((c) => c.equals(course))) {
            return res.status(400).json({ message: "Student is not registered for this course" })
        }
        const score = await Score.create({ student, course, caScore, examScore })
        res.status(201).json({ message: "Score recorded", data: score })
    } catch (err) {
        if (err.code === 11000) return res.status(409).json({ message: "Score already exists for the student and course" })
        if (err.name === "ValidationError") return res.status(400).json({ message: err.message })
        if (err.name === "CastError") return res.status(400).json({ message: "Invalid ID" })
        res.status(500).json({ message: err.message })
    }
}

const getStudentScores = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id)
        if (!student) return res.status(404).json({ message: "Student not found" })

        const scores = await Score.find({ student: req.params.id }).populate("course", "title code description")

        res.status(200).json({
            student: { _id: student._id, firstName: student.firstName, lastName: student.lastName },
            count: scores.length,
            data: scores
        })
    } catch (err) {
        if (err.name === "CastError") return res.status(400).json({ message: "Invalid ID" })
        res.status(500).json({ message: err.message })
    }
}

module.exports = { createScore, getStudentScores }