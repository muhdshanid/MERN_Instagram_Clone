import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useGetSuggestionUsersQuery } from '../store/services/userServices';
import SuggestionUsers from './userSide/SuggestionUsers';
const RightSideHome = () => {
    const { user } = useSelector((state) => state.authReducer);
    const [suggestionUsers, setSuggestionUsers] = useState()
    const {data = [],isFetching} = useGetSuggestionUsersQuery()
    useEffect(()=>{
        if( isFetching === false){
            setSuggestionUsers(data)
        }
    },[isFetching])

  return (
    <div className='mt-[2.5rem]    w-4/12 ml-16'>
        <div className="w-[90%] ">
        <div className='p-3 -ml-10'>
            <div className='flex gap-4 items-center  justify-between'>
                <div>
                    <img className='w-[50px] h-[50px] rounded-full' src={user.profilePic}alt="profile" />
                </div>
                <div className='flex flex-col grow'>
                    <h6 className='font-semibold text-sm'>{user.username}</h6>
                    <p className='text-gray-400 text-sm'>{user.fullname}</p>
                </div>
                <div>
                    <button className='button text-sm' >Switch</button>
                </div>
            </div>
        </div>
        <div className='flex justify-between mb-4 -ml-6 items-center'>
            <h6 className='text-gray-400 font-semibold'>Suggestions For You</h6>
            <Link to={"/suggested-users"}>
            <h6 className='hover:text-gray-400 text-xs font-semibold'>See All</h6>
            </Link>
        </div>
        <div className='ml-4'>
        <div className="flex flex-col gap-4  -ml-5">     
       {
         suggestionUsers?.slice(0,10).map(suggestedUser => {
            return (
            <SuggestionUsers suggestedUser={suggestedUser} key={suggestedUser._id}/>
            )})
        }
        </div>
        </div>
    </div>
    </div>
    
  )
}

export default RightSideHome