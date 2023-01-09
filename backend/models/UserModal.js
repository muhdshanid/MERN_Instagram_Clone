import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types
const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    bio:String,
    profilePic:{type:String,default:"https://cdn130.picsart.com/318381621277201.jpg"},
    followers:[{type:ObjectId,ref:"User"}],
    following:[{type:ObjectId,ref:"User"}],
    savedPosts:[{type:ObjectId,ref:"Post"}],
    mobilenumber:Number,
    gender:{type:String,default:"Prefer not to say",enum:["Male","Custom","Female","Prefer not to say"]}
},{
    timestamps:true
})

const UserModel = mongoose.model("User",userSchema)

export default UserModel