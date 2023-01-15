import express from 'express'
import { allUsers, followUnfollowUser, getFollowers, getFollowingUsers, getLoggedInUser, getPostedUser, getSuggestionUsers, updateUser } from '../controllers/userControllers.js'
import { verifyToken } from '../middlewares/verifyToken.js'

const userRouter = express.Router()

userRouter.put("/update-user",verifyToken,updateUser)
userRouter.put("/follow-unfollow-user/:id",verifyToken,followUnfollowUser)
userRouter.get("/suggestion-users",verifyToken,getSuggestionUsers)
userRouter.get("/get-following-users",verifyToken,getFollowingUsers)
userRouter.get("/get-followers",verifyToken,getFollowers)
userRouter.get("/get-posted-user/:id",verifyToken,getPostedUser)
userRouter.get("/get-user",verifyToken,getLoggedInUser)
userRouter.get("/all-users",verifyToken,allUsers)

export default userRouter 