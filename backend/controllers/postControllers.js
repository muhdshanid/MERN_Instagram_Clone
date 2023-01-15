import asyncHandler from "express-async-handler";
import PostModel from "../models/PostModal.js";
import UserModel from "../models/UserModal.js";
import { validateMongoDBID } from "../services/validateMongoDBID.js";
import mongoose from "mongoose";
export const createPost = asyncHandler(async (req, res) => {
  try {
    const newPost = await PostModel.create(req.body);
    return res.status(200).json(newPost);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json("Internal server error");
  }
});

export const getLoggedInUserPosts = asyncHandler(async (req, res) => {
  try {
    const id = req.userId;
    const myPosts = await PostModel.find({ postedBy: id });
    if (!myPosts) {
      return res.status(200).json("You dont have any post");
    }
    return res.status(200).json(myPosts);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json("Internal server error");
  }
});

export const updatePost = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongoDBID(id)
    let post = await PostModel.findById(id);
    if (!post) {
      return res.status(400).json("Post does not found");
    }
    post = await PostModel.findByIdAndUpdate(id, {
      $set: req.body,
    },{new:true});
    let updatePost = await post.save();
    return res.status(200).json(updatePost);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json("Internal server error");
  }
});

export const likePost = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    const post = await PostModel.findById(id);
    if (!post.likes.includes(userId)) {
      const liked = await PostModel.findByIdAndUpdate(id,{ $push: { likes: userId } },{new:true});
      return res.status(200).json(liked);
    } else{
        const unliked =await PostModel.findByIdAndUpdate(id,{$pull : {likes:userId}},{new:true})
        return res.status(200).json(unliked);
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json("Internal server error");
  }
});

export const commentPost = asyncHandler(async (req, res) => {
    try {
      const { comment, postId } = req.body;
      const id = req.userId
      const user = await UserModel.findById(id)
      const comments = {
        user: user._id,
        username:user.username ,
        comment,
        profile:user.profilePic
      };
      const post = await PostModel.findById(postId);
      post.comments.push(comments);
      await post.save();
      return res.status(200).json(post);
    } catch (error) {
      console.log(error.message);
      return res.status(500).json("Internal server error");
    }
  })


  export const deletePost = asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      validateMongoDBID(id)
      const userId = req.userId.toString()
      const post = await PostModel.findById(id);
      if (post.postedBy.toString() === userId) {
        const deletePost = await PostModel.findByIdAndDelete(id);
        return res.status(200).json("Your post has been deleted");
      } else {
        return res.status(400).json("You are not allowed to delete this post");
      }
    } catch (error) {
      console.log(error.message);
      return res.status(500).json("Internal server error");
    }
  })
  

  export const commentLike = asyncHandler( async (req,res)=> {
    try {
       const {postId,commentId} = req.body
       const id = req.userId
       const post = await PostModel.findById(postId)
       const comment = post.comments.find(cmt => {
        return cmt._id.toString() === commentId 
       })
       if(comment ){
        if(!comment.likes.includes(id)){
           comment.likes.push(id)
        }else{
            comment.likes.pull(id)
        }
       }else{
        return res.status(400).json("Comment not found")
       }
       await post.save()
       return res.status(200).json(post)
      } catch (error) {
        console.log(error.message);
        return res.status(500).json("Internal server error");
      }
  })

  export const getTimelinePost = asyncHandler(
    async (req,res) => {
      try {
          const userId = req.userId
          const currentUserPosts = await PostModel.find({postedBy:userId})
          const followingUsersPosts = await UserModel.aggregate([
              {$match:{
                  _id:new mongoose.Types.ObjectId(userId)
              }},{
                  $lookup:{
                      from:"posts",
                      localField:"following",
                      foreignField:"postedBy",
                      as:"followingPosts"
                  }
              },{
                  $project:{
                      followingPosts:1,
                      _id:0
                  }
              }
          ])
          
          return res.status(200).json
          (currentUserPosts.concat(...followingUsersPosts[0].followingPosts).sort(
            (a,b)=> {
                return b.createdAt - a.createdAt
            }
        ))
      } catch (error) {
          console.log(error.message);
          return res.status(500).json("Server internal error")
      }
  }
  )