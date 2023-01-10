import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import { connectDB } from './config/dbConnect.js'
import authRouter from './routes/authRoutes.js'
import { errorHandler, notFound } from './middlewares/errorHandler.js'
import userRouter from './routes/userRoutes.js'
import postRouter from './routes/postRoutes.js'

dotenv.config()
const app = express()

const PORT = process.env.PORT || 5000

connectDB()
app.use(cors())
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)
app.use("/api/post",postRouter)
app.use(notFound)
app.use(errorHandler)

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})