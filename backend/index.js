import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import { connectDB } from './config/dbConnect.js'
import authRouter from './routes/authRoutes.js'
import { errorHandler, notFound } from './middlewares/errorHandler.js'
import userRouter from './routes/userRoutes.js'
import {Server} from 'socket.io'
import postRouter from './routes/postRoutes.js'
import messageRouter from './routes/messageRoutes.js'

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
app.use("/api/message",messageRouter)
app.use(notFound)
app.use(errorHandler)

const server = app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})

const io = new  Server(server,{
    cors:{
        origin:"http://localhost:3000",
        credetials:true
    }
})
global.onlineUsers = new Map();
io.on("connection",(socket)=>{
    global.chatsocket = socket;
    socket.on("addUser",(id)=>{
        onlineUsers.set(id,socket.id);
    })

    socket.on("sendMsg",(data)=>{
        const sendUserSocket = onlineUsers.get(data.to)
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("msg-receive",data.message)
        }
    })
})
