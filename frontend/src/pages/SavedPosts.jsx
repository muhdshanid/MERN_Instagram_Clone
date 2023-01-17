import React, { useEffect, useState } from 'react'
import { TbChevronLeft } from 'react-icons/tb'
import { Link } from 'react-router-dom'
import postImage from "../assets/images/image3.jpg";
import SavedPost from '../components/postSide/SavedPost';
import { useGetSavedPostsQuery } from '../store/services/userServices';

const SavedPosts = () => {
    const [savedPosts, setSavedPosts] = useState([])
  const {data,isFetching} = useGetSavedPostsQuery()
  useEffect(()=>{
    if(isFetching === false)
    setSavedPosts(data)
  },[isFetching])
  return (
    <div className='bg-gray-100 flex flex-col min-h-screen w-full ml-[20.5%]'>
        <div className='m-4'>
            <div className='pt-2 ml-1 '>
                <div className='flex items-center gap-0'>
                    <Link to={"/profile"}>
                    <TbChevronLeft size={24} className='text-gray-400 font-semibold'/>
                    </Link>
                    <h6 className='font-semibold text-sm text-gray-400'>Saved</h6>
                </div>
            </div>
            <div className='pt-2 ml-2'>
                <h6 className='text-xl font-normal'>All Posts</h6>
            </div>
            <div className='pt-2 ml-2'>
                <div className='flex flex-wrap gap-8'>
               {
                savedPosts.length > 0 ? savedPosts.map(post => (
                    <SavedPost post={post} />
                )) : ""
               }
                </div>
            </div>
        </div>
    </div>
  )
}

export default SavedPosts