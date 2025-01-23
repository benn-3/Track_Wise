const express = require("express")
const app = express()
const cors = require("cors")
const connectToDB = require("./config/db")
const dotenv = require("dotenv").config()

const PORT = 7000

app.use(cors({
    origin: "*"
}))

connectToDB()

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})