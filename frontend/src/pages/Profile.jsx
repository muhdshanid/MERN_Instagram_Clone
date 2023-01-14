import React, { useState } from 'react'
import {CgShapeHexagon} from 'react-icons/cg'
import {BsGrid3X3} from 'react-icons/bs'
import {VscBookmark} from 'react-icons/vsc'
import SavedPostsTab from '../components/SavedPostTab'
import ProfilePostsTab from '../components/ProfilePostsTab'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
const Profile = () => {
    const [toggleTabs, setToggleTabs] = useState(true)
      const {user} = useSelector(state => state.authReducer)
  return (
    <div className='bg-gray-100 flex flex-col w-[70%] ml-[22%]'>
        <div className='p-4 flex border-b'>
            <div className='px-4 py-3 ml-10'>
                <img src={user.profilePic} className="w-[150px] h-[150px] rounded-full" alt="" />
            </div>
            <div className='mx-4 my-4 flex flex-col'>
                <div className='ml-14 py-3 flex justify-between items-center'>
                    <h6 className='text-xl font-normal'>{user.username}</h6>
                    <div className='flex items-center grow ml-4 gap-2'>
                    <Link to={"/edit-profile"} 
                    className='bg-gray-200 font-semibold hover:bg-gray-300 px-3 py-1 rounded-md'>
                        Edit Profile</Link> 
                    <CgShapeHexagon size={26}/>
                    </div>
                </div>
                <div className='flex gap-4 ml-14 my-5'>
                    <p><span className='font-semibold text-md'></span> Posts</p>
                    <p><span className='font-semibold text-md'>{user?.followers.length}</span> followers</p>
                    <p><span className='font-semibold text-md'>{user?.following.length}</span> following</p>
                </div>
                <div className='flex flex-col ml-14 gap-2'>
                    <h6 className='font-semibold text-md'>{user.fullname}</h6>
                    <div className='w-[70%]'>
                    <p>{user.bio}</p>
                    </div>
                </div>
            </div>
        </div>
        <div className='relative'>
            <div className='ml-[18.5rem]  p-4 gap-16 flex'>
                <div onClick={()=>setToggleTabs(true)} className=' transition-all flex cursor-pointer items-center gap-1 '>
                    <BsGrid3X3 className={` ${!toggleTabs ? "text-gray-400" : ""}`} size={12}/>
                    <h6 className={`font-semibold uppercase text-xs ${!toggleTabs ? "text-gray-400" : ""}`}>Posts</h6>
                </div>
                <div  onClick={()=>setToggleTabs(false)} className='  transition-all flex cursor-pointer items-center gap-1 '>
                    <VscBookmark className={` ${toggleTabs ? "text-gray-400" : ""}`} size={12}/>
                    <h6 className={`font-semibold uppercase text-xs ${toggleTabs ? "text-gray-400" : ""}`}>Saved</h6>
                </div>
                { toggleTabs ? <div className='absolute  transition-all  -top-5 left-[19rem]'>
                    ___________
                </div> : 
                <div className='absolute  transition-all  -top-5 left-[26.2rem]'>
                ___________
            </div>
                }
                
            </div>
        </div>
        {
            toggleTabs ? <div className='ml-[1rem]  transition-all '>
            <ProfilePostsTab/>
        </div> : 
        <div className=' transition-all '>
        <SavedPostsTab/>
    </div>
        }
        

    </div>
  )
}

export default Profile