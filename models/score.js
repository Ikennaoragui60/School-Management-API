
const mongoose = require("mongoose")
const course = require("./course")

const scoreSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    caScore: { type: Number, required: true, min: 0, max: 30 },
    examScore: { type: Number, required: true, min: 0, max: 70 },
    totalScore: { type: Number }
}, { timestamps: true })

scoreSchema.index({ student: 1, course: 1 }, { unique: true })

scoreSchema.pre("validate", function () {
    this.totalScore = this.caScore + this.examScore
})

module.exports = mongoose.model("Score", scoreSchema)