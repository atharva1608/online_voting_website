const express = require('express')
const app=express()
const mongoose  = require('mongoose')
const routesUrls = require('./routes/routes')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
dotenv.config()
mongoose.connect(process.env.DATABASE_ACCESS,()=>console.log("Database Connected"),{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
})

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials:true,
    origin:['http://localhost:3000','http://localhost:8080']
}))
app.use('/api',routesUrls)
app.listen(8080, () => console.log("server is running"))