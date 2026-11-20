
const express = require("express")
const router = express.Router()
const { createCourse, getCourse } = require("../controllers/courseController")

router.post("/", createCourse)
router.get("/:id", getCourse)

module.exports = router