import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  video: {
    type: String,
  },
  likes: {
    type: Array,
  },
  comments: [{
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    fullname:{
        type:String,
        required:true
    },
    profile:{
        type:String,
    },
    comment:{
        type:String,
        required:true
    },
    likes:{
        type:Array
    }}],
  commentAllowed:{
    type:Boolean,
    default:true
  },
  LikesCountVisible:{
    type:Boolean,
    default:true
  }
},{
  timestamps:true
});

const PostModel = mongoose.model("Post", postSchema);

export default PostModel;