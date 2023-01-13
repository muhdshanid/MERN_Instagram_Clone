import React from "react";
import profile from "../assets/images/profile.jpg";
import postIMg from "../assets/images/post.jpg";
import {AiOutlineHeart} from 'react-icons/ai'
import {VscBookmark} from 'react-icons/vsc'
import {TbMessageCircle2} from 'react-icons/tb'
import {FaRegSmile} from 'react-icons/fa'
import {IoPaperPlaneOutline} from 'react-icons/io5'
import { IoIosMore } from "react-icons/io";
import { Link } from "react-router-dom";
import EmojiPicker from 'emoji-picker-react';
import { useState } from "react";

const Post = () => {
  const [emojiShow, setEmojiShow] = useState(false)
  return (
    <div className="ml-[3rem] mr-[1rem] border w-8/12 bg-white relative rounded-lg ">
      <div onClick={()=>setEmojiShow(false)}  className="flex items-center p-[0.5rem]">
        <div>
          <img
            src={profile}
            alt="profile"
            className="w-[3rem] hover:text-gray-400 h-[3rem] rounded-full"
          />
        </div>
        <div className="ml-3 w-96">
          <Link className="hover:text-gray-400" to={"/other-profile"}>
          <h3>Cristiano</h3></Link>
        </div>
        <div className="">
          <IoIosMore className="hover:text-gray-400" size={24} />
        </div>
      </div>
      <div onClick={()=>setEmojiShow(false)} >
        <div>
          <img className="h-[330px] w-full" src={postIMg} alt="post-img" />
        </div>
      </div>
      <div onClick={()=>setEmojiShow(false)} >
        <div className="flex justify-between p-3">
            <div className="flex gap-3 items-center">
                <AiOutlineHeart className="hover:text-gray-400" size={27}/>
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
            <p className="font-semibold">99,999 likes</p>
        </div>
        <div className="flex items-center">
            <p className="font-semibold text-sm">Cristiano</p> 
            <p>&nbsp;my first post</p>
        </div>
        <div>
            <p className="text-gray-400">view all 48,122 comments</p>
        </div>
        <div className="flex items-center">
            <p className="font-semibold text-sm">messi</p> 
            <p>&nbsp;nice post mahn</p>
        </div>
        <div className="flex items-center">
            <p className="font-semibold text-sm">neymer</p> 
            <p>&nbsp;liked it</p>
        </div>
        <div className="my-2">
            <p className="text-gray-300  text-xs">17 HOURS AGO</p>
        </div>
      </div>
      <div className="p-3">
        <div className="flex gap-1  justify-between">
            <div>
                <FaRegSmile onClick={()=>setEmojiShow(!emojiShow)} className="hover:text-gray-400 cursor-pointer" size={28}/>
            </div>
            <div className="grow">
                <input className="w-full px-2 outline-none border-none placeholder:text-gray-400 text-black
                "  type="text" placeholder="Add a comment..." />
            </div>
            <div className="">
                <button className="button">Post</button>
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
