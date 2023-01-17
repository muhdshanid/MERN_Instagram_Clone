import express from "express";
import {
  addRecentSearchPerson,
  allUsers,
  changePassword,
  clearRecentSearchHistory,
  followUnfollowUser,
  getFollowers,
  getFollowingUsers,
  getOtherUserPosts,
  getPostedUser,
  getSavedPosts,
  getSuggestionUsers,
  getUser,
  removeRecentSearchPerson,
  savePost,
  updateUser,
} from "../controllers/userControllers.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const userRouter = express.Router();

userRouter.put("/update-user", verifyToken, updateUser);
userRouter.put("/follow-unfollow-user/:id", verifyToken, followUnfollowUser);
userRouter.get("/suggestion-users", verifyToken, getSuggestionUsers);
userRouter.get("/get-following-users", verifyToken, getFollowingUsers);
userRouter.get("/get-followers", verifyToken, getFollowers);
userRouter.get("/get-posted-user/:id", verifyToken, getPostedUser);
userRouter.get("/get-other-user/:id", getOtherUserPosts);
userRouter.get("/get-user/:id", verifyToken, getUser);
userRouter.put("/save-post/:id", verifyToken, savePost);
userRouter.get("/get-saved-posts",verifyToken, getSavedPosts);
userRouter.get("/all-users", verifyToken, allUsers);
userRouter.put("/add-recent-search", verifyToken, addRecentSearchPerson);
userRouter.put("/remove-recent-search", verifyToken, removeRecentSearchPerson);
userRouter.put("/clear-recent-search", verifyToken, clearRecentSearchHistory);
userRouter.put("/change-password",verifyToken,changePassword)

export default userRouter;
