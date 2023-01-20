import React, { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'
import ChatBox from '../components/ChatBox'
import ProfileSkeleton from '../components/loading/ProfileSkeleton'
import { useGetFollowingUsersQuery } from '../store/services/userServices'

const Messages = () => {
    const {user} = useSelector(state => state.authReducer)
    const [selectedUser, setSelectedUser] = useState(null)
    const [followingUsers, setFollowingUsers] = useState([])
    const {data,isFetching} = useGetFollowingUsersQuery()
    useEffect(()=>{
        if(isFetching === false){
            setFollowingUsers(data)
        }
    },[isFetching])
  return (
    <div className='flex  bg-gray-100 min-h-screen w-[100%]  ml-[20%]'>
         <div className='m-6 flex rounded bg-white border w-full h-[90vh]'>
            <div className='border-r w-[35%] h-full'>
                <div className='border-b h-[12%]'>
                    <div className='flex h-full items-center justify-center'>
                        <h6 className='font-semibold text-md'>{user.fullname}</h6>
                    </div>
                </div>
                <div className='w-full h-[79vh] overflow-hidden overflow-y-scroll'>
                {
                    isFetching ? <div className='mt-6 -ml-4 flex flex-col gap-4'>
                        <ProfileSkeleton/> 
                        <ProfileSkeleton/> 
                        <ProfileSkeleton/> 
                        <ProfileSkeleton/> 
                        <ProfileSkeleton/> 
                    </div>: 
                    followingUsers.length > 0 ? 
                    followingUsers.map(followingUser => (
                        <div key={followingUser._id} onClick={()=>setSelectedUser(followingUser)} className=' p-4 hover:bg-gray-100'>
                    <div className='flex  gap-4 items-center'>
                        <div>
                            <img src={followingUser.profilePic} className='w-9 h-9 rounded-full object-cover' alt="profile" />
                        </div>
                        <div>
                            <h6>{followingUser.fullname}</h6>
                        </div>
                    </div>
                </div>
                    )) : ""
                }
                </div>
            </div>
            <ChatBox selectedUser={selectedUser}/>
         </div>
    </div>
  )
}

export default Messages