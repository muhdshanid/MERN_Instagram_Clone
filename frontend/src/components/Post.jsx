import React from "react";
import profile from "../assets/images/profile.jpg";
import postIMg from "../assets/images/post.jpg";
import {AiOutlineHeart} from 'react-icons/ai'
import {VscBookmark} from 'react-icons/vsc'
import {TbMessageCircle2} from 'react-icons/tb'
import {FaRegSmile} from 'react-icons/fa'
import {IoPaperPlaneOutline} from 'react-icons/io5'
import { IoIosMore } from "react-icons/io";
const Post = () => {
  return (
    <div className="ml-[5rem] mr-[1rem] border w-6/12 bg-white rounded-lg ">
      <div className="flex items-center p-[0.5rem]">
        <div>
          <img
            src={profile}
            alt="profile"
            className="w-[3rem] h-[3rem] rounded-full"
          />
        </div>
        <div className="ml-3 w-96">
          <h3>Cristiano</h3>
        </div>
        <div className="">
          <IoIosMore size={24} />
        </div>
      </div>
      <div>
        <div>
          <img className="h-[330px] w-full" src={postIMg} alt="post-img" />
        </div>
      </div>
      <div>
        <div className="flex justify-between p-3">
            <div className="flex gap-2 items-center">
                <AiOutlineHeart size={28}/>
                <TbMessageCircle2 size={28}/>
                <IoPaperPlaneOutline size={25}/>
            </div>
            <div>
                <VscBookmark size={28}/>
            </div>
        </div>
      </div>
      <div className="flex border-b  flex-col px-3 gap-[2px]">
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
                <FaRegSmile size={28}/>
            </div>
            <div className="grow">
                <input className="w-full px-2 outline-none border-none placeholder:text-gray-400 text-black
                "  type="text" placeholder="Add a comment..." />
            </div>
            <div className="">
                <button className="text-blue-400">Post</button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
