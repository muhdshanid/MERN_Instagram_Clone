import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { updateUser } from '../../store/reducers/authReducer';
import { useCommentPostMutation, useLikePostMutation } from '../../store/services/postServices';
import { useSaveUnsavePostMutation } from '../../store/services/userServices';
import PostDetails from '../postSide/PostDetails';

const UserPost = ({post}) => {
    const { user } = useSelector((state) => state.authReducer);
    const dispatch = useDispatch()
    const [postDetailsModal, setPostDetailsModal] = useState(false);
    const [comment, setComment] = useState("")
    const [postDetails, setPostDetails] = useState(post)
    const [likes, setLikes] = useState(post.likes.length)
    const [comments, setComments] = useState(post.comments.length)
    const [likePost, res] = useLikePostMutation();
    const [commentPost, result] = useCommentPostMutation();
    const [savePost, response] = useSaveUnsavePostMutation();
    useEffect(() => {
      if (res.isSuccess) {
        setPostDetails(res?.data);
        setLikes(res?.data?.likes.length);
        setComments(res?.data?.comments.length);
      }
    }, [res.isSuccess]);
    useEffect(() => {
      if (result.isSuccess) {
        setPostDetails(result?.data);
      }
    }, [result.isSuccess]);
    useEffect(() => {
      if (response?.isSuccess) {
        const dataFromLocalStorage = localStorage.getItem("userData");
        let { user, token } = JSON.parse(dataFromLocalStorage);
        user = response?.data;
        localStorage.setItem("userData", JSON.stringify({ user, token }));
        dispatch(updateUser(response?.data));
      }
    }, [response.isSuccess]);
  
  return (
    <>
    <div className="">
    <Link className=" ">
      <img onClick={()=>{
        setPostDetailsModal(true)}}
        className="w-[240px] h-[240px] object-cover"
        src={post.image}
        alt="post"
      />
    </Link>
  </div>
  {postDetailsModal && (
                    <div className="w-[90pc] transition-all -ml-[20pc] -mt-[20pc] z-10 min-h-[102vh]  fixed bg-black/50">
                      <PostDetails
                        setComment={setComment}
                        comment={comment}
                        setPostDetails={setPostDetails}
                        setComments={setComments}
                        setLikes={setLikes}
                        setPostDetailsModal={setPostDetailsModal}
                        post={post}
                        postedUser={user}
                      />
                    </div>
                  )}
    </>
  )
}

export default UserPost