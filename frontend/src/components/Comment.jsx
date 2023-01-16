import React from 'react'
import { Link } from 'react-router-dom'

const Comment = ({comment}) => {
  return (
    <div className="flex  items-center px-[0.5rem] py-2 ">
    <div>
      <img
        src={comment?.profile}
        alt="profile"
        className=" object-contain hover:text-gray-400 w-[40px] h-[40px] rounded-full"
      />
    </div>
    <div className="ml-3 mr-4">
      <Link className="hover:text-gray-400 font-semibold" to={"/other-profile"}>
      <h3>{comment?.username}</h3></Link>
    </div>
      <div>
      <h3>{comment.comment}</h3>
      </div>
  </div>
  )
}

export default Comment