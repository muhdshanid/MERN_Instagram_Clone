import express from 'express'
import { loginUser, registerUser } from '../controllers/authControllers.js'
import { loginValidations, registerValidations } from '../validations/authValidations.js'

const authRouter = express.Router()

authRouter.post("/signup",registerValidations,registerUser)
authRouter.post("/login",loginValidations,loginUser)
export default authRouter