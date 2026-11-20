
const Student = require("../models/student")
const bcrypt = require("bcryptjs")
const Course = require("../models/course")

const createStudent = async (req, res) => {
    try {
        const { firstName, lastName, email, phoneNumber, password } = req.body
        if (!password || password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const student = await Student.create({ firstName, lastName, email, phoneNumber, password: hashedPassword })
        student.password = undefined
        res.status(201).json({ message: "Student registered", data: student })
    } catch (err) {
        if (err.code === 11000) return res.status(409).json({ message: "Email already exists" })
        if (err.name === "ValidationError") return res.status(400).json({ message: err.message })
        res.status(500).json({ message: err.message })
    }
}

const registerCourse = async (req, res) => {
    try {
        const { studentId, courseId } = req.params

        const student = await Student.findById(studentId)
        if (!student) return res.status(404).json({ message: "Student not found" })

        const course = await Course.findById(courseId)
        if (!course) return res.status(404).json({ message: "Course not found" })

        if (student.courses.some((c) => c.equals(courseId))) {
            return res.status(409).json({ message: "Student already registered for this course" })
        }

        student.courses.push(courseId)
        course.students.push(studentId)
        await student.save()
        await course.save()

        await student.populate("courses", "title code description")
        student.password = undefined
        res.status(200).json({ message: "Course registered successfully", data: student })
    } catch (err) {
        if (err.name === "CastError") return res.status(400).json({ message: "Invalid ID" })
        res.status(500).json({ message: err.message })
    }
}

const getStudent = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id).populate("courses", "title code description")
        if (!student) return res.status(404).json({ message: "Student not found" })
        res.status(200).json({ data: student })
    } catch (err) {
        if (err.name === "CastError") return res.status(400).json({ message: "Invalid ID" })
        res.status(500).json({ message: err.message })
    }
}

module.exports = { createStudent, registerCourse, getStudent }