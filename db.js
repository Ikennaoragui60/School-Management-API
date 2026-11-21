
const mongoose = require("mongoose")
const databaseurl = process.env.databaseurl

mongoose.connect(databaseurl).then(() => console.log("database connection established")).catch((err) => console.log("Unable to connect to database due to" + err))






