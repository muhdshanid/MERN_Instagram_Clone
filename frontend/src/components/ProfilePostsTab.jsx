import React from "react";
import { Link } from "react-router-dom";
import postImage from "../assets/images/image3.jpg";
const ProfilePostsTab = () => {
  return (
    <div className="">
      <div className="flex flex-wrap gap-8">
        <div className="">
            <Link  className="hover:opacity-50">
            <img className='w-[240px] h-[240px] object-cover' src={postImage} alt="post" />
            </Link>
        </div>
        <div className="">
            <Link  className="hover:opacity-50">
            <img className='w-[240px] h-[240px] object-cover' src={postImage} alt="post" />
            </Link>
        </div>
        <div className="">
            <Link  className="hover:opacity-50">
            <img className='w-[240px] h-[240px] object-cover' src={postImage} alt="post" />
            </Link>
        </div>
        <div className="">
            <Link  className="hover:opacity-50">
            <img className='w-[240px] h-[240px] object-cover' src={postImage} alt="post" />
            </Link>
        </div>
        <div className="">
            <Link  className="hover:opacity-50">
            <img className='w-[240px] h-[240px] object-cover' src={postImage} alt="post" />
            </Link>
        </div>
        <div className="">
            <Link  className="hover:opacity-50">
            <img className='w-[240px] h-[240px] object-cover' src={postImage} alt="post" />
            </Link>
        </div>
        <div className="">
            <Link  className="hover:opacity-50">
            <img className='w-[240px] h-[240px] object-cover' src={postImage} alt="post" />
            </Link>
        </div>
        <div className="">
            <Link  className="hover:opacity-50">
            <img className='w-[240px] h-[240px] object-cover' src={postImage} alt="post" />
            </Link>
        </div>
        <div className="">
            <Link  className="hover:opacity-50">
            <img className='w-[240px] h-[240px] object-cover' src={postImage} alt="post" />
            </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfilePostsTab;
