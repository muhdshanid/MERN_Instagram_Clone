import express from "express";
import { createMessage, getMessage } from "../controllers/messageControllers.js";
import { verifyToken } from "../middlewares/verifyToken.js";


const messageRouter = express.Router();

messageRouter.post("/new",verifyToken,createMessage)
messageRouter.get("/get-messages/:to",getMessage)

export default messageRouter