import React, { useContext, useState } from 'react'
import {CgShapeHexagon} from 'react-icons/cg'
import {BsGrid3X3} from 'react-icons/bs'
import {VscBookmark} from 'react-icons/vsc'
import SavedPostsTab from '../components/postSide/SavedPostTab'
import ProfilePostsTab from '../components/postSide/ProfilePostsTab'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { DataContext } from '../context/DataProvider'
import ChangeProfilePopup from '../components/userSide/ChangeProfilePopup'
import { IoClose } from 'react-icons/io5'
const Profile = () => {
    const [profileChangePopUp, setProfileChangePopUp] = useState(false)
    const {userPostsLength} = useContext(DataContext)
    const [toggleTabs, setToggleTabs] = useState(true)
      const {user} = useSelector(state => state.authReducer)
  return (
    <div className='bg-gray-100 flex flex-col w-[70%] ml-[22%]'>
        <div className='p-4 flex border-b'>
            <div className='px-4 py-3 ml-10'>
                <img onClick={()=>setProfileChangePopUp(true)} src={user?.profilePic} className="
                w-[150px] h-[150px] rounded-full cursor-pointer" alt="" />
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
                    <p><span className='font-semibold text-md'>{userPostsLength}</span> Posts</p>
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
        <div className='relative ml-[18.5rem] '>
            <div className=' p-4 gap-16 flex'>
                <div onClick={()=>setToggleTabs(true)} className=' transition-all flex cursor-pointer items-center gap-1 '>
                    <BsGrid3X3 className={` ${!toggleTabs ? "text-gray-400" : ""}`} size={12}/>
                    <h6 className={`font-semibold uppercase text-xs ${!toggleTabs ? "text-gray-400" : ""}`}>Posts</h6>
                </div>
                <div  onClick={()=>setToggleTabs(false)} className='  transition-all flex cursor-pointer items-center gap-1 '>
                    <VscBookmark className={` ${toggleTabs ? "text-gray-400" : ""}`} size={12}/>
                    <h6 className={`font-semibold uppercase text-xs ${toggleTabs ? "text-gray-400" : ""}`}>Saved</h6>
                </div>
                { toggleTabs ? <div className='absolute  transition-all  -top-5 left-[0.3rem]'>
                    ___________
                </div> : 
                <div className='absolute  transition-all  -top-5 left-[7.5rem]'>
                ___________
            </div>
                }
                
            </div>
        </div>
        {
            toggleTabs ? <div className='ml-[1rem]   transition-all '>
            <ProfilePostsTab user={"LoggedInUser"}/>
        </div> : 
        <div className=' transition-all '>
        <SavedPostsTab/>
    </div>
        }
        {
            profileChangePopUp &&  <>
            <div className="
            w-[90pc] transition-all -ml-[20pc]  z-10 min-h-[102vh]  fixed bg-black/60">
                <ChangeProfilePopup setProfileChangePopUp={setProfileChangePopUp}/>
              </div>
                <div  className="absolute z-50 top-3 right-2 text-white ">
                <IoClose onClick={()=>setProfileChangePopUp(false)} className=" cursor-pointer" size={30}/>
            </div>
            </>
        }

    </div>
  )
}

export default Profile