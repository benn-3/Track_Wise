const express = require("express")
const app = express()
const cors = require("cors")
const connectToDB = require("./config/db")
const dotenv = require("dotenv").config()

const PORT = 7000

app.use(cors({
    origin: "*"
}))

app.use(express.json())

connectToDB()

const authRoutes = require("./routes/authRoutes")
const tokenRoutes = require("./routes/tokenRoutes")

app.use("/api/auth",authRoutes)
app.use("/api/token",tokenRoutes)


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})