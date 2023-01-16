import expresss from 'express'
import { commentLike, commentPost, createPost,
     deletePost,
     getLoggedInUserPosts, getTimelinePost, likePost, updatePost } from '../controllers/postControllers.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const postRouter = expresss.Router()

postRouter.post("/create-post", verifyToken, createPost);
postRouter.get("/get-posts",verifyToken, getLoggedInUserPosts);
postRouter.get("/get-timeline-posts",verifyToken,getTimelinePost)
postRouter.put("/update-post/:id", verifyToken, updatePost);
postRouter.put("/like/:id", verifyToken, likePost);
postRouter.put("/comment-post", verifyToken, commentPost);
postRouter.put("/like-comment",verifyToken,commentLike)
postRouter.delete("/delete-post/:id",verifyToken,deletePost)
export default postRouter 