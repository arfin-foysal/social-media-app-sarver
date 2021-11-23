const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const helmet = require('helmet')
const morgan = require('morgan')

const authRouter = require('./routers/auth')
const UserRouter = require('./routers/users')

dotenv.config();

mongoose.connect(process.env.MONGO_URL, () => {
    console.log("Connect To BD");
});



// middleware
app.use(express.json())
app.use(helmet())
app.use(morgan("common"))

app.use("/api/users",UserRouter)
app.use("/api/auth",authRouter)

app.listen(8080, () => {
    console.log("Backend Server is Running");
})

