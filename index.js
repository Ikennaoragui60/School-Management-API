const env = require("dotenv")
env.config()
const express = require("express")
require("./db")


const app = express()
app.use(express.json())
app.use("/api/students", require("./routes/studentRoutes"))
app.use("/api/courses", require("./routes/courseRoutes"))
app.use("/api/scores", require("./routes/scoreRoutes"))

app.get("/", (req, res) => res.send("My name is Jonah, and I’m a young man from Anambra State, Nigeria, with big dreams and a strong desire to build something meaningful with my life.          I come from a family that means a lot to me. I have a twin brother and three sisters, and growing up with them has shaped a big part of who I am. My family is one of the reasons I want to succeed—not just for myself, but so I can create a better future for the people I love.         My journey hasn’t always been easy. I’ve had moments of doubt, financial struggles, uncertainty, and times when I questioned whether I was really on the right path. But I’ve learned to keep moving, even when I don’t have everything figured out.          Right now, I’m building myself through technology. I’m learning backend development with JavaScript and Node.js, working on projects, making mistakes, fixing them, and growing with every step. My bigger goal is to become a full-stack developer, build my own products and businesses, and create a life I can be proud of.          Above everything, my faith in God keeps me grounded. I believe He has a purpose for my life, even when I can’t see the whole picture yet.          I’m still becoming the person I want to be, and I know I have a long way to go. But I’m willing to learn, work, fail, try again, and keep going until I get there."))

app.listen(2026, () => console.log("Server is actively running on port 2026"))