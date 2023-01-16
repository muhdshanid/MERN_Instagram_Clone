import React, { useEffect } from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { FaRegSmile } from 'react-icons/fa'
import { GrBookmark } from 'react-icons/gr'
import { ImBookmark } from 'react-icons/im'
import { IoIosMore } from 'react-icons/io'
import { IoClose, IoPaperPlaneOutline } from 'react-icons/io5'
import { TbMessageCircle2 } from 'react-icons/tb'
import { VscBookmark } from 'react-icons/vsc'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { updateUser } from '../store/reducers/authReducer'
import { useCommentPostMutation, useLikePostMutation } from '../store/services/postServices'
import { useSaveUnsavePostMutation } from '../store/services/userServices'
import Comment from './Comment'

const PostDetails = ({post,postedUser,setPostDetailsModal,setLikes
,setComments,setPostDetails,setComment,comment}) => {
    const { user } = useSelector((state) => state.authReducer);
    const dispatch = useDispatch()
    const [likePost,res] = useLikePostMutation()
    const [commentPost,result] = useCommentPostMutation()
    const [savePost,response] = useSaveUnsavePostMutation()
    useEffect(()=>{
      if(res.isSuccess){
        setPostDetails(res?.data)
        setLikes(res?.data?.likes.length)
        setComments(res?.data?.comments.length)
      }
    },[res.isSuccess])
    useEffect(()=>{
      if(result.isSuccess){
        setPostDetails(result?.data)
      }
    },[result.isSuccess])
    useEffect(()=>{
        if(response?.isSuccess) {
        const dataFromLocalStorage =  localStorage.getItem("userData")
        let {user,token} = JSON.parse(dataFromLocalStorage)
        user = response?.data
        localStorage.setItem("userData",JSON.stringify({user,token}))
        dispatch(updateUser(response?.data))
        }
    },[response.isSuccess])
    const handleLike = id => {
      likePost(id)
    }
    const handleComment = postId => {
      if(comment !== null){
        commentPost({comment,postId})
        setComment("")
      }
    }
    const handleSave = postId => {
        savePost(postId)
      }
  return (
    <div className={`w-[67%] transition-all  ml-[13%] rounded-md
       mx-auto h-[89vh] my-10 flex absolute  items-center justify-between `}>
        <div onClick={()=>setPostDetailsModal(false)} className="absolute  -top-6 -right-[9rem] text-white">
   <IoClose className=" cursor-pointer" size={30}/>
 </div>
        <div className='w-[50%] p-4 h-full flex bg-black/100'>
            <img src={post.image} className="object-contain w-full h-full" alt="post" />
        </div>
        <div className='flex w-[50%] flex-col gap-2 h-full bg-white '>
        <div className="flex border-b items-center p-[0.5rem]">
        <div>
          <img
            src={postedUser?.profilePic}
            alt="profile"
            className=" object-contain hover:text-gray-400 w-[40px] h-[40px] rounded-full"
          />
        </div>
        <div className="ml-3 w-96">
          <Link className="hover:text-gray-400 font-semibold" to={"/other-profile"}>
          <h3>{postedUser?.fullname}</h3></Link>
        </div>
        <div className="">
          <IoIosMore className="hover:text-gray-400" size={24} />
        </div>
      </div>
        <div className="flex  items-center px-[0.5rem] pb-2 ">
        <div>
          <img
            src={postedUser?.profilePic}
            alt="profile"
            className=" object-contain hover:text-gray-400 w-[40px] h-[40px] rounded-full"
          />
        </div>
        <div className="ml-3 mr-4">
          <Link className="hover:text-gray-400 font-semibold" to={"/other-profile"}>
          <h3>{postedUser?.fullname}</h3></Link>
        </div>
          <div>
          <h3>{post.title}</h3>
          </div>
      </div>
      <div className='h-[290px]  overflow-hidden overflow-y-scroll'>
        {
            post?.comments?.map(cmt => (
                <Comment comment={cmt}/>
            )) 
        }
      </div>
      <div className="flex border-t justify-between px-4 ">
            <div className="flex gap-3 items-center pt-2">
                {
                  post.likes.includes(user._id) ?
                  <AiFillHeart onClick={()=>handleLike(post._id)}   size={27} color="red" />
                  :
                  <AiOutlineHeart  onClick={()=>handleLike(post._id)} className="hover:text-gray-400" size={27}/>
                }
                <TbMessageCircle2 className="hover:text-gray-400" size={27}/>
                <IoPaperPlaneOutline className="hover:text-gray-400" size={25}/>
            </div>
            <div className='pt-2'>
              {
                user.savedPosts.includes(post._id) ? 
                <ImBookmark onClick={()=>handleSave(post._id)}  size={25}/> :
                <GrBookmark onClick={()=>handleSave(post._id)} className="hover:text-gray-400" size={25}/>
              }
            </div>
        </div>
        <div className='border-b px-4'>
            <p className="font-semibold">{post.likes.length} likes</p>
        </div>
        <div className="flex gap-1 py-2 px-4 justify-between">
            <div>
                <FaRegSmile className="hover:text-gray-400 cursor-pointer" size={28}/>
            </div>
            <div className="grow">
                <input value={comment} onChange={(e)=>setComment(e.target.value)}
                 className="w-full px-2 outline-none border-none placeholder:text-gray-400 text-black
                "  type="text" placeholder="Add a comment..." />
            </div>
            <div className="">
                <button onClick={()=>handleComment(post._id)} className="button">Post</button>
            </div>
        </div>
        </div>
    </div>
  )
}

export default PostDetails