
const express = require("express")
const router = express.Router()
const {createScore} = require("../controllers/scoreController")

router.post("/",createScore)

module.exports = router