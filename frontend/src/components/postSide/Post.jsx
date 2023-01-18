import React, { useEffect } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { TbMessageCircle2 } from "react-icons/tb";
import { FaRegSmile } from "react-icons/fa";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { IoIosMore } from "react-icons/io";
import { Link } from "react-router-dom";
import { ImBookmark } from "react-icons/im";
import { useState } from "react";
import {
  useGetPostedUserQuery,
  useSaveUnsavePostMutation,
} from "../../store/services/userServices";
import {
  useCommentPostMutation,
  useLikePostMutation,
} from "../../store/services/postServices";
import { useDispatch, useSelector } from "react-redux";
import PostDetails from "./PostDetails";
import { updateUser } from "../../store/reducers/authReducer";
import { GrBookmark } from "react-icons/gr";

const Post = ({ post }) => {
  const { user } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const [postedUser, setPostedUser] = useState();
  const [postDetailsModal, setPostDetailsModal] = useState(false);
  const [comment, setComment] = useState("");
  const [postDetails, setPostDetails] = useState(post);
  const [likes, setLikes] = useState(post.likes.length);
  const [comments, setComments] = useState(post.comments.length);
  const { data, isFetching } = useGetPostedUserQuery(post?.postedBy);
  const [likePost, res] = useLikePostMutation();
  const [commentPost, result] = useCommentPostMutation();
  const [savePost, response] = useSaveUnsavePostMutation();
  useEffect(() => {
    if (isFetching === false) {
      setPostedUser(data);
    }
  }, [isFetching]);
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
  const handleLike = (id) => {
    likePost(id);
  };
  const handleComment = (postId) => {
    if (comment !== null) {
      commentPost({ comment, postId });
      setComment("");
    }
  };
  const handleSave = (postId) => {
    savePost(postId);
  };
  return (
    <>
      <div className="ml-[3rem] mr-[1rem]  border w-12/12 bg-white   static rounded-lg ">
        <div className="flex items-center p-[0.5rem]">
          <div>
            <img
              src={postedUser?.profilePic}
              alt="profile"
              className="  hover:text-gray-400 w-9 h-9 rounded-full"
            />
          </div>
          <div className="ml-3 w-96">
            <Link
              className="hover:text-gray-400"
              to={`${
                postedUser?._id === user._id
                  ? "/profile"
                  : `/other-profile/${postedUser?._id}`
              }`}
            >
              <h3>{postedUser?.fullname}</h3>
            </Link>
          </div>
          <div className="">
            <IoIosMore className="hover:text-gray-400" size={24} />
          </div>
        </div>
        <div>
          <div>
            <img
              className="h-[330px] w-full object-cover"
              src={postDetails.image}
              alt="post-img"
            />
          </div>
        </div>
        <div>
          <div className="flex justify-between p-3">
            <div className="flex gap-3 items-center">
              {postDetails.likes.includes(user._id) ? (
                <AiFillHeart
                  className="transition-all"
                  onClick={() => handleLike(postDetails._id)}
                  size={27}
                  color="red"
                />
              ) : (
                <AiOutlineHeart
                  onClick={() => handleLike(postDetails._id)}
                  className="hover:text-gray-400
                   transition-all"
                  size={27}
                />
              )}
              {postDetails.commentAllowed ? (
                <TbMessageCircle2
                  onClick={() => setPostDetailsModal(true)}
                  className="hover:text-gray-400"
                  size={27}
                />
              ) : (
                ""
              )}
              <IoPaperPlaneOutline className="hover:text-gray-400" size={25} />
            </div>
            <div>
              {user.savedPosts.includes(post._id) ? (
                <ImBookmark
                  onClick={() => handleSave(postDetails._id)}
                  size={25}
                />
              ) : (
                <GrBookmark
                  onClick={() => handleSave(postDetails._id)}
                  className="hover:text-gray-400"
                  size={25}
                />
              )}
            </div>
          </div>
        </div>
        <div className="flex border-b  flex-col px-3 gap-[2px]">
          {postDetails.LikesCountVisible || postDetails.postedBy === user._id ? (
            <div>
              <p className="font-semibold">{likes} likes</p>
            </div>
          ) : (
            ""
          )}
          <div className="flex items-center">
            <p className="font-semibold text-sm">{postedUser?.fullname}</p>
            <p>&nbsp; {postDetails.title}</p>
          </div>
          {postDetails.commentAllowed ? (
            <div>
              <p
                onClick={() => setPostDetailsModal(true)}
                className=" cursor-pointer
        text-gray-400"
              >
                view all {comments} comments
              </p>
            </div>
          ) : (
            ""
          )}
          {postDetails.commentAllowed
            ? postDetails?.comments?.slice(0, 2).map((cmt) => (
                <div className="flex items-center" key={cmt._id}>
                  <p className="font-semibold text-sm">{cmt.username}</p>
                  <p>&nbsp;{cmt.comment}</p>
                </div>
              ))
            : ""}

          <div className="my-2">
            <p className="text-gray-300  text-xs">
              {new Date(postDetails.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
        {postDetails.commentAllowed ? (
          <div className="p-3">
            <div className="flex gap-1  justify-between">
              <div>
                <FaRegSmile
                  className="hover:text-gray-400 cursor-pointer"
                  size={28}
                />
              </div>
              <div className="grow">
                <input
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full px-2 outline-none border-none placeholder:text-gray-400 text-black
              "
                  type="text"
                  placeholder="Add a comment..."
                />
              </div>
              <div className="">
                <button
                  onClick={() => handleComment(postDetails._id)}
                  className="button"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      {postDetailsModal && (
        <>
          <div className="w-[90pc] transition-all -ml-[20pc] -mt-6  min-h-[102vh] fixed bg-black/50">
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
        </>
      )}
    </>
  );
};

export default Post;
