import React from 'react'
import { Link } from 'react-router-dom'
import postImage from "../assets/images/image3.jpg";

const SavedPostsTab = () => {
  return (
    <div>
        <div>
            <div className='flex justify-between items-center mb-4'>
                <p className='font-normal text-sm text-gray-400'>Only you can see what you've saved</p>
                <button className='button'>+ New Collection</button>
            </div>
            <Link to={"/saved-posts"} className='w-full flex h-[400px] '>
                <div className='w-[50%] ml-[35%]'>
                <img className='w-[150px] h-[150px]  rounded-tl object-cover' src={postImage} alt="post" />
                <img className='w-[150px] h-[150px]  rounded-bl  object-cover' src={postImage} alt="post" />
                </div>
                <div className='w-[50%] ml-[-18.3rem]'>
                <img className='w-[150px] h-[150px]  rounded-tr  object-cover' src={postImage} alt="post" />
                <img className='w-[150px] h-[150px]  rounded-br object-cover' src={postImage} alt="post" />
                </div>
            </Link>
        </div>
    </div>
  )
}

export default SavedPostsTab