
const express = require("express")
require("./db")
const PORT = 2026

const app = express()
app.use(express.json())
app.use("/api/students", require("./routes/studentRoutes"))
app.use("/api/courses", require("./routes/courseRoutes"))
app.use("/api/scores", require("./routes/scoreRoutes"))

app.get("/", (req, res) => res.send("Hello!"))

app.listen(PORT, () => console.log(`My app is running on port ${PORT}`))