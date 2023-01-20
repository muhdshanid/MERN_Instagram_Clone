import React, { useEffect } from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useLikeCommentMutation } from '../../store/services/postServices'

const Comment = ({comment,post,setPostDetails,setLikes,setComments}) => {
  const {user} = useSelector(state => state.authReducer)
  const [likeComment,res] = useLikeCommentMutation()
  const handleLike = id => {
    likeComment({commentId:id,postId:post._id})
  }
  useEffect(() => {
    if (res.isSuccess) {
      setPostDetails(res?.data);
      setLikes(res?.data?.likes.length);
      setComments(res?.data?.comments.length);
    }
  }, [res.isSuccess]);
  console.log(res);
  return (
    <div className="flex  items-center px-[0.5rem] py-2 ">
    <div>
      <img
        src={comment?.profile}
        alt="profile"
        className=" object-cover hover:text-gray-400 w-[40px] h-[40px] rounded-full"
      />
    </div>
    <div className="ml-3 mr-4">
      <Link className="hover:text-gray-400 font-semibold" to={`${
                comment?.user === user._id
                  ? "/profile"
                  : `/other-profile/${comment?.user}`
              }`}>
      <h3>{comment?.fullname}</h3></Link>
    </div>
      <div>
      <h3>{comment.comment}</h3>
      </div>
      <div className=' ml-auto flex gap-1  items-center'>
      {comment.likes.includes(user._id) ? (
                <AiFillHeart
                  className="transition-all cursor-pointer"
                  onClick={() => handleLike(comment._id)}
                  size={17}
                  color="red"
                />
              ) : (
                <AiOutlineHeart
                  onClick={() => handleLike(comment._id)}
                  className="hover:text-gray-400
                   transition-all cursor-pointer"
                  size={17}
                />
              )}
              <p className='text-sm font-semibold text-gray-400'>{comment.likes.length} likes</p>
      </div>
  </div>
  )
}

export default Comment