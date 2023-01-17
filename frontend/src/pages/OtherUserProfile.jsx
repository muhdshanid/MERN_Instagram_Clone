import React, { useEffect, useState } from 'react'
import profile from "../assets/images/profile.jpg"
import {BsGrid3X3} from 'react-icons/bs'
import {VscBookmark} from 'react-icons/vsc'
import SavedPostsTab from '../components/postSide/SavedPostTab'
import ProfilePostsTab from '../components/postSide/ProfilePostsTab'
import { Link, useLocation } from 'react-router-dom'
import { FaUserPlus } from 'react-icons/fa'
import { IoIosMore } from 'react-icons/io'
import { useFollowUnfollowUserMutation, useGetOtherUserPostsQuery, useGetUserQuery } from '../store/services/userServices'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../store/reducers/authReducer'
import Loading from '../components/loading/Loading'
const OtherUserProfile = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const { user } = useSelector((state) => state.authReducer);
    const id = location.pathname.split("/")[2]
    const [otherUserPosts, setOtherUserPosts] = useState([])
    const [otherUser, setotherUser] = useState()
    const [toggleTabs, setToggleTabs] = useState(true)
    const [followUnfollowUser, res] = useFollowUnfollowUserMutation();
    const followHandler = (id) => {
      followUnfollowUser(id);
    };
    const {data,isFetching} = useGetOtherUserPostsQuery(id)
    const {data:getData,isFetching : gettindData} = useGetUserQuery(id)
    useEffect(()=>{
        if(isFetching === false){
            setOtherUserPosts(data)
        }
    },[id,isFetching]) 
    useEffect(()=>{
        if(gettindData === false){
            setotherUser(getData)
        }
    },[id,gettindData])
    useEffect(() => {
        if (res?.isSuccess) {
          const dataFromLocalStorage =  localStorage.getItem("userData")
            let {user,token} = JSON.parse(dataFromLocalStorage)
            user = res?.data
            localStorage.setItem("userData",JSON.stringify({user,token}))
            dispatch(updateUser(res?.data))
            }
      }, [res.isSuccess]); 
  return (
    <div className='bg-gray-100 flex flex-col w-[70%] min-h-screen ml-[22%]'>
        <div className='p-4 flex border-b'>
            <div className='px-4 py-3 ml-10'>
                <img src={otherUser?.profilePic} className="w-[150px] h-[150px] rounded-full" alt="" />
            </div>
            <div className='mx-4 my-4 flex flex-col'>
                <div className='ml-14 py-3 flex  items-center'>
                    <div>
                    <h6 className='text-xl font-normal'>{otherUser?.fullname}</h6>
                    </div>
                    <div className='flex items-center relative grow ml-4 gap-2'>
          <button
            onClick={() => followHandler(otherUser?._id)}
            className={`${
              user?.following?.includes(otherUser?._id)
                ? `bg-gray-200  
                font-semibold ${res.isLoading ? "text-gray-200" : ""} hover:bg-gray-300 rounded-md`
                : `button-two ${res.isLoading ? "blue" : "text-white" } font-semibold`
            } px-5 py-1`}
          
          >
             { 
             user?.following?.includes(otherUser?._id) ? "Following" : "Follow"}
          </button>
          {res?.isLoading  ? (
                  <div className={`absolute  ${user?.following?.includes(otherUser?._id) ? "left-12 " : "left-8 "}flex items-center justify-cente`}>
                    <Loading />
                  </div>
                ) : ""}
                        <Link to={"/edit-profile"} 
                    className='bg-gray-200 font-semibold hover:bg-gray-300 px-3 py-1 rounded-md'>
                        Message</Link>
                        <button className='bg-gray-200 px-2 py-2 rounded-md'><FaUserPlus/></button>
                        <IoIosMore size={24} /> 
                    </div>

                </div>
                <div className='flex gap-4 ml-14 my-5'>
                    <p><span className='font-semibold text-md'>{otherUserPosts?.length}</span> Posts</p>
                    <p><span className='font-semibold text-md'>{otherUser?.followers.length}</span> followers</p>
                    <p><span className='font-semibold text-md'>{otherUser?.following.length}</span> following</p>
                </div>
                <div className='flex flex-col ml-14 gap-2'>
                    <h6 className='font-semibold text-md'>{otherUser?.username}</h6>
                    <div className='w-[70%]'>
                    <p>{otherUser?.bio}</p>
                    </div>
                </div>
            </div>
        </div>
        <div className='relative ml-[18.5rem]'>
            <div className='  p-4 gap-16 flex'>
                <div onClick={()=>setToggleTabs(true)} className=' transition-all flex cursor-pointer items-center gap-1 '>
                    <BsGrid3X3 className={` ${!toggleTabs ? "text-gray-400" : ""}`} size={12}/>
                    <h6 className={`font-semibold uppercase text-xs ${!toggleTabs ? "text-gray-400" : ""}`}>Posts</h6>
                </div>
                <div  onClick={()=>setToggleTabs(false)} className='  transition-all flex cursor-pointer items-center gap-1 '>
                    <VscBookmark className={` ${toggleTabs ? "text-gray-400" : ""}`} size={12}/>
                    <h6 className={`font-semibold uppercase text-xs ${toggleTabs ? "text-gray-400" : ""}`}>Reels</h6>
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
            toggleTabs ? <div className='ml-[1rem]  transition-all '>
            <ProfilePostsTab otherUserPosts={otherUserPosts} otherUser={otherUser} user={"OtherUser"}/>
        </div> : 
        <div className=' transition-all '>
        <SavedPostsTab/>
    </div>
        }
        

    </div>
  )
}

export default OtherUserProfile