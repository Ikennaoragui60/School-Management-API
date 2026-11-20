const env = require("dotenv")
env.config()
const express = require("express")
require("./db")


const app = express()
app.use(express.json())
app.use("/api/students", require("./routes/studentRoutes"))
app.use("/api/courses", require("./routes/courseRoutes"))
app.use("/api/scores", require("./routes/scoreRoutes"))

app.get("/", (req, res) => res.send("Hello!"))

app.listen(2026, () => console.log("Server is actively running on port 2026"))