
const express = require("express")
const router = express.Router()
const { createStudent, registerCourse, getStudent, getAllStudent } = require("../controllers/studentController")
const { getStudentScores } = require("../controllers/scoreController")

router.post("/", createStudent)
router.post("/:studentId/courses/:courseId", registerCourse)
router.get("/:id", getStudent)
router.get("/:id/scores", getStudentScores)
router.get("/",getAllStudent)
module.exports = router