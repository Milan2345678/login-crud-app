const express = require("express")
const mongoose = require("mongoose")

const app = express()

app.use(express.json())
app.use(express.static("public"))

mongoose.connect("mongodb://127.0.0.1:27017/loginDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err))

const userRoutes = require("./routes/userRoutes")

app.use("/api/users", userRoutes)

app.listen(3000, () => {
  console.log("Server running on port 3000")
})