import asyncHandler from "express-async-handler";
import PostModel from "../models/PostModal.js";
import UserModel from "../models/UserModal.js";
import { comparePassword, hashedPassword } from "../services/authServices.js";
import { validateMongoDBID } from "../services/validateMongoDBID.js";

export const updateUser = asyncHandler(async (req, res) => {
  const id = req.userId;
  console.log(id);
  validateMongoDBID(id);
  try {
    const updateUser = await UserModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(200).json(updateUser);
  } catch (error) {
    throw new Error(error);
  }
});

export const followUnfollowUser = asyncHandler(async(req,res) => {
    try {
        const {id} = req.params
        validateMongoDBID(id)
    if(id !== req.userId){ 
        const userToFollow = await UserModel.findById(id)
        const loggedInUser = await UserModel.findById(req.userId)
        if(!userToFollow.followers.includes(req.userId)){
            await userToFollow.updateOne({$push:{followers:req.userId}})
            const result = await UserModel.findByIdAndUpdate(req.userId,{$push:{following:id}},{ new : true})
            return res.status(200).json(result)
        }else{
            await userToFollow.updateOne({$pull:{followers:req.userId}})
           const result = await UserModel.findByIdAndUpdate(req.userId,{$pull:{following:id}},{new:true})
            return res.status(200).json(result)
        }
    }else{
        return res.status(400).json("You cannot follow your self")
    }
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message:"Internal server error"})
    }
})
export const getSuggestionUsers = asyncHandler(async (req, res) => {
  try {
    const allUser = await UserModel.find({});
    const id = req.userId;
    validateMongoDBID(id)
    const user = await UserModel.findById(id);
   if(user){
    const followingUsers = await Promise.all(user.following.map((user) => user));
    let userToFollow = allUser.filter((user)=>{
        return !followingUsers.find((item)=>{
            return user.id.toString() === item.toString()
        })
    });
   
    let filtered = userToFollow.filter((user) => {
      return user._id != id;
    });
    let filterUsers = await Promise.all(
      filtered.map((item) => {
        const { email, mobilenumber, followers, following, password, ...other } = item._doc;
        return other;
      })
    );
     return res.status(200).json(filterUsers);
   }else{
    return res.status(200).json({message:"User not found"})
   }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export const getFollowingUsers = asyncHandler (async (req,res) => {
    try {
        const user = await UserModel.findById(req.userId)
        const followingUsers = await Promise.all(
            user.following.map(usr => {
                return UserModel.findById(usr)
            })
        )
        let followingList = []
         followingUsers.map(person => {
            const {email,phonenumber,followers,following,password,...other} = person._doc
            followingList.push(other)
        })
        return res.status(200).json(followingList)
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message:"Internal server error"})
    }
}
)
export const getFollowers = asyncHandler(async (req,res) => {
    try {
        const id = req.userId
        validateMongoDBID(id)
        const user = await UserModel.findById(id)
        const followers = await Promise.all(
            user.followers.map(usr => {
                return UserModel.findById(usr)
            })
        )
        let followersList = []
         followers.map(person => {
            if(person){
                const {email,phonenumber,followers,following,password,...other} = person._doc
                followersList.push(other)
            }
        })
        return res.status(200).json(followersList)
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message:"Internal server error"})
    }
})

export const allUsers = asyncHandler(async(req,res) => {
    try {
        const id = req.userId
     const allUsers = await UserModel.find({})
     const filteredUsers = allUsers.filter((user)=> user._id.toString() !== id.toString())
     return res.status(200).json(filteredUsers)
    } catch (error) {
     console.log(error.message);
         return res.status(500).json({message:"Internal server error"})
    }
 
 })

 export const getPostedUser = asyncHandler(async (req,res) => {
    try {
        const {id} = req.params 
        const user = await UserModel.findById(id)
        if(!user){  
            return res.status(400).json("User not found")
        }
        const {email,password,phonenumber,...others} = user._doc
        return res.status(200).json(others)
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message:"Internal server error"})
    }
})
 export const getOtherUserPosts = asyncHandler(async (req,res) => {
    try {
        const {id} = req.params 
        const otherUserPosts = await PostModel.find({postedBy:id})
        return res.status(200).json(otherUserPosts)
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message:"Internal server error"})
    }
})
 export const getUser =asyncHandler(
    async (req,res) => {
        try {
            const {id} = req.params 
            const user = await UserModel.findById(id) 
            if(!user){  
                return res.status(400).json("User not found")
            }
            return res.status(200).json(user)
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({message:"Internal server error"})
        }
    }
 )
 export const getSavedPosts = asyncHandler(
    async (req,res) => {
        try {
            const id = req.userId 
            const userSavedPosts = await UserModel.findById(id).populate("savedPosts").select("savedPosts -_id")
            if(!userSavedPosts){  
                return res.status(400).json("User not found")
            }
            return res.status(200).json(userSavedPosts.savedPosts.sort( (a,b)=> {
                return b.createdAt - a.createdAt
            }))
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({message:"Internal server error"})
        }
    }
 )
 export const savePost = asyncHandler(async (req,res) => {
    try {
        const {id} = req.params
        const userId = req.userId 
        const user = await UserModel.findById(userId)
        if(user.savedPosts.includes(id)){
            const unsavePost = await UserModel.findByIdAndUpdate(userId,{$pull:{savedPosts:id}},{new:true}) 
            return res.status(200).json(unsavePost)
        }else{
            const savePost = await UserModel.findByIdAndUpdate(userId,{$push:{savedPosts:id}},{new:true}) 
            return res.status(200).json(savePost)
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message:"Internal server error"})
    }
})
 export const addRecentSearchPerson = asyncHandler(async (req,res) => {
    try {
        const {person} = req.body
        const userId = req.userId 
        const user = await UserModel.findById(userId)
        const exist = user.searchHistory.filter(user => user._id === person._id)
        if(exist.length === 0){
            const recentSearchAdd = await UserModel
            .findByIdAndUpdate(userId,{$push:{searchHistory:person}},{new:true}) 
            return res.status(200).json(recentSearchAdd)
        }else{
            return res.status(200).json(user)
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message:"Internal server error"})
    }
})
 export const removeRecentSearchPerson = asyncHandler(async (req,res) => {
    try {
        const {person} = req.body
        const userId = req.userId 
        const user = await UserModel.findById(userId)
        const exist = user.searchHistory.filter(user => user._id === person._id)
        if(exist.length > 0){
            const recentSearchRemove = await UserModel.findByIdAndUpdate(userId,{$pull:{searchHistory:person}},{new:true}) 
            return res.status(200).json(recentSearchRemove)
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message:"Internal server error"})
    }
})
 export const clearRecentSearchHistory = asyncHandler(async (req,res) => {
    try {
        const userId = req.userId 
        const user = await UserModel.findByIdAndUpdate(userId,{$set:{searchHistory:[]}},{new:true})
        return res.status(200).json(user)
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message:"Internal server error"})
    }
})
 export const changePassword = asyncHandler(async (req,res) => {
    try {
        const userId = req.userId 
        const {oldPassword,newPassword} = req.body
        const user = await UserModel.findById(userId)
        if(user){
            const matchPass = await  comparePassword(oldPassword,user.password)
            if(matchPass){
                const hashPass = await hashedPassword(newPassword)
                const updateUser = await  UserModel.findByIdAndUpdate(userId,{$set:{password:hashPass}})
                return res.status(200).json(updateUser)
            }else{
                return res.status(400).json({errors:[{msg:`Incorrect password`,param:"password"}]})

            }
        }
        return res.status(200).json(user)
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message:"Internal server error"})
    }
})


