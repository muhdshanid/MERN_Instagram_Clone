import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { updateUser } from '../../store/reducers/authReducer';
import { useCommentPostMutation, useLikePostMutation } from '../../store/services/postServices';
import { useGetUserQuery, useSaveUnsavePostMutation } from '../../store/services/userServices';
import PostDetails from './PostDetails';

const ExplorePosts = ({post}) => {
    const dispatch = useDispatch()
    const [postedUser, setPostedUser] = useState()
    const [comment, setComment] = useState("")
    const [postDetailsModal, setPostDetailsModal] = useState(false);
    const [postDetails, setPostDetails] = useState(post)
    const [likes, setLikes] = useState(post.likes.length)
    const [comments, setComments] = useState(post.comments.length)
    const [likePost, res] = useLikePostMutation();
    const [commentPost, result] = useCommentPostMutation();
    const [savePost, response] = useSaveUnsavePostMutation();
    const {data,isFetching } = useGetUserQuery(post.postedBy)
    useEffect(()=>{
        if(isFetching === false){
            setPostedUser(data)
        }
    },[isFetching])
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
    <div className='flex flex-wrap gap-4'>
                            <img onClick={()=>setPostDetailsModal(true)} src={postDetails.image} alt="post" className='object-cover
                             w-[300px] h-[300px] cursor-pointer' />
    </div>
    {postDetailsModal && (
                    <div className="w-[90pc] transition-all -ml-[20pc] -mt-[21pc] z-10 min-h-[102vh]  fixed bg-black/50">
                      <PostDetails
                        setComment={setComment}
                        comment={comment}
                        setPostDetails={setPostDetails}
                        setComments={setComments}
                        setLikes={setLikes}
                        setPostDetailsModal={setPostDetailsModal}
                        post={postDetails}
                        postedUser={postedUser}
                      />
                    </div>
                  )}
    </>
  )
}

export default ExplorePosts