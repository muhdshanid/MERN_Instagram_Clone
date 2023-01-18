import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateUser } from '../../store/reducers/authReducer';
import { useFollowUnfollowUserMutation, useGetUserQuery } from '../../store/services/userServices';
import Loading from '../loading/Loading';
const SuggestionUsers = ({suggestedUser}) => {
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.authReducer);
    const [followed,setFollowed] = useState(false)
    const [followUnfollowUser,res] = useFollowUnfollowUserMutation()
    const followHandler = (id) => {
        followUnfollowUser(id)
    }
    useEffect(()=>{
        if(res?.isSuccess) {
        const dataFromLocalStorage =  localStorage.getItem("userData")
        let {user,token} = JSON.parse(dataFromLocalStorage)
        user = res?.data
        localStorage.setItem("userData",JSON.stringify({user,token}))
        dispatch(updateUser(res?.data))
        }
    },[res.isSuccess])
  return (
   suggestedUser && <div  className='flex  static gap-4  items-center justify-between'>   
   <div className='-ml-4'>
               <img src={suggestedUser.profilePic} className='w-[30px] h-[30px] rounded-full' alt="profile" />
           </div>
           <div className='-ml-2 grow'>
            <Link to={`/other-profile/${suggestedUser._id}`}>
            <h6 className='font-semibold text-sm'>{suggestedUser.username}</h6></Link>
           </div>
           <div>
               <button onClick={()=>followHandler(suggestedUser._id)} className={`
               ${res.isLoading ? "text-gray-100 text-sm" : "button text-sm"}`}>
                   {
                       user?.following?.includes(suggestedUser._id) ? "following" : "follow"
                   }
               </button>
           </div>
           {res?.isLoading  ? (
                  <div className="absolute  right-[8.8%] flex items-center justify-center">
                    <Loading />
                  </div>
                ) : ""}
           </div>
  )
}

export default SuggestionUsers

