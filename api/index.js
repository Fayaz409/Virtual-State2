import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { errorHandler } from './utils/error.js'
import authRouter from './routes/auth.route.js'
import userRouter from './routes/user.routes.js'
const app=express()

dotenv.config();
mongoose.connect(process.env.MONGO).then(()=>{
    console.log('connected to mongodb')
})
.catch((err)=>{
    console.log(`${err} while connecting to mongodb`)
})



app.use(express.json())


app.listen(3000,()=>{
    console.log('Running on port 3000!!!')
})


app.use('/api/user',userRouter)
app.use('/api/auth',authRouter)
app.use((err,req,res,next)=>{
    const statusCode=err.statusCode || 500;
    const message=err.message || 'Internal Server Error'
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    })
})