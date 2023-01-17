import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import gray from "../../assets/images/gray.png";
import { useGetSavedPostsQuery } from '../../store/services/userServices';

const SavedPostsTab = () => {
  const [savedPosts, setSavedPosts] = useState([])
  const {data,isFetching} = useGetSavedPostsQuery()
  useEffect(()=>{
    if(isFetching === false)
    setSavedPosts(data)
  },[isFetching])
  return (
    <div>
        <div className='flex flex-col gap-4'>
            <div className='flex justify-between items-center '>
                <p className='font-normal text-sm text-gray-400'>Only you can see what you've saved</p>
                <button className='button'>+ New Collection</button>
            </div>
          <div className='w-full flex mx-auto justify-center h-[400px]'>
         {
          savedPosts?.length > 0 ? 
          <Link to={"/saved-posts"} className='flex flex-col'>
          <div className=' flex mx-auto '>
          <img className='w-[150px] border  rounded-tl-lg  h-[150px]    object-cover' src={
            savedPosts[0]?.image ? savedPosts[0]?.image : gray
          } alt="post" /> 
          <img className='w-[150px] border  rounded-tr-lg   h-[150px]   object-cover' src={ savedPosts[1]?.image ? savedPosts[1]?.image : gray} alt="post" />
          </div>
          <div className='  flex mx-auto'>
          <img className='w-[150px] border rounded-bl-lg    h-[150px]    object-cover' src={ savedPosts[2]?.image ? savedPosts[2]?.image : gray} alt="post" />
          <img className='w-[150px] border rounded-br-lg    h-[150px]   object-cover' src={ savedPosts[3]?.image ? savedPosts[3]?.image : gray} alt="post" />
          </div>
      </Link> : ""
         }
          </div>
        </div>
    </div>
  )
}

export default SavedPostsTab