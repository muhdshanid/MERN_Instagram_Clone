import React, { useEffect } from "react";
import {AiFillHeart, AiOutlineHeart} from 'react-icons/ai'
import {VscBookmark} from 'react-icons/vsc'
import {TbMessageCircle2} from 'react-icons/tb'
import {FaRegSmile} from 'react-icons/fa'
import {IoPaperPlaneOutline} from 'react-icons/io5'
import { IoIosMore } from "react-icons/io";
import { Link } from "react-router-dom";
import EmojiPicker from 'emoji-picker-react';
import { useState } from "react";
import { useGetPostedUserQuery } from "../store/services/userServices";
import { useCommentPostMutation, useLikePostMutation } from "../store/services/postServices";
import { useSelector } from "react-redux";

const Post = ({post}) => {
  const { user } = useSelector((state) => state.authReducer);
  const [postedUser, setPostedUser] = useState()
  const [comment, setComment] = useState("")
  const [postDetails, setPostDetails] = useState(post)
  const [likes, setLikes] = useState(post.likes.length)
  const [comments, setComments] = useState(post.comments.length)
  const [emojiShow, setEmojiShow] = useState(false)
  const {data,isFetching} = useGetPostedUserQuery(post?.postedBy)
  const [likePost,res] = useLikePostMutation()
  const [commentPost,result] = useCommentPostMutation()
  useEffect(()=>{
    if(isFetching === false){
      setPostedUser(data)
    }
  },[isFetching])
  useEffect(()=>{
    if(res.isSuccess){
      setPostDetails(res?.data)
      setLikes(res?.data?.likes.length)
      setComments(res?.data?.comments.length)
    }
  },[res.isSuccess])
  useEffect(()=>{
    if(result.isSuccess){
      setPostDetails(result?.data)
    }
  },[result.isSuccess])
  const handleLike = id => {
    likePost(id)
  }
  const handleComment = postId => {
    if(comment !== null){
      commentPost({comment,postId})
      setComment("")
    }
  }
  return (
    <div className="ml-[3rem] mr-[1rem] border w-12/12 bg-white relative rounded-lg ">
      <div onClick={()=>setEmojiShow(false)}  className="flex items-center p-[0.5rem]">
        <div>
          <img
            src={postedUser?.profilePic}
            alt="profile"
            className=" object-contain hover:text-gray-400 w-[40px] h-[40px] rounded-full"
          />
        </div>
        <div className="ml-3 w-96">
          <Link className="hover:text-gray-400" to={"/other-profile"}>
          <h3>{postedUser?.fullname}</h3></Link>
        </div>
        <div className="">
          <IoIosMore className="hover:text-gray-400" size={24} />
        </div>
      </div>
      <div onClick={()=>setEmojiShow(false)} >
        <div>
          <img className="h-[330px] w-full object-cover" src={postDetails.image} alt="post-img" />
        </div>
      </div>
      <div onClick={()=>setEmojiShow(false)} >
        <div className="flex justify-between p-3">
            <div className="flex gap-3 items-center">
                {
                  postDetails.likes.includes(user._id) ?
                  <AiFillHeart onClick={()=>handleLike(postDetails._id)}   size={27} color="red" />
                  :
                  <AiOutlineHeart  onClick={()=>handleLike(postDetails._id)} className="hover:text-gray-400" size={27}/>
                }
                <TbMessageCircle2 className="hover:text-gray-400" size={27}/>
                <IoPaperPlaneOutline className="hover:text-gray-400" size={25}/>
            </div>
            <div>
                <VscBookmark className="hover:text-gray-400" size={25}/>
            </div>
        </div>
      </div>
      <div onClick={()=>setEmojiShow(false)}  className="flex border-b  flex-col px-3 gap-[2px]">
        <div>
            <p className="font-semibold">{likes} likes</p>
        </div>
        <div className="flex items-center">
            <p className="font-semibold text-sm">{postedUser?.fullname}</p> 
            <p>&nbsp; {postDetails.title}</p>
        </div>
        <div>
            <p className="text-gray-400">view all {comments} comments</p>
        </div>
      {
        postDetails.comments.map(cmt => 
          <div className="flex items-center">
          <p className="font-semibold text-sm">{cmt.username}</p> 
          <p>&nbsp;{cmt.comment}</p>
      </div>)
      }
        <div className="my-2">
            <p className="text-gray-300  text-xs">{new Date(postDetails.createdAt).toLocaleString()}</p>
        </div>
      </div>
      <div className="p-3">
        <div className="flex gap-1  justify-between">
            <div>
                <FaRegSmile onClick={()=>setEmojiShow(!emojiShow)} className="hover:text-gray-400 cursor-pointer" size={28}/>
            </div>
            <div className="grow">
                <input value={comment} onChange={(e)=>setComment(e.target.value)}
                 className="w-full px-2 outline-none border-none placeholder:text-gray-400 text-black
                "  type="text" placeholder="Add a comment..." />
            </div>
            <div className="">
                <button onClick={()=>handleComment(postDetails._id)} className="button">Post</button>
            </div>
        </div>
      </div>
     {
      emojiShow &&  <div className="absolute transition-all top-[19.4rem] ">
      <EmojiPicker lazyLoadEmojis={true} height={300} width={300}/>
    </div>
     }
    </div>
  );
};

export default Post;
