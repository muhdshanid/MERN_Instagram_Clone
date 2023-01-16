import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../store/reducers/authReducer";
import { useFollowUnfollowUserMutation } from "../store/services/userServices";
import Loading from "./loading/Loading";
const SuggestionUser = ({ suggestedUser }) => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.authReducer);
  const [followUnfollowUser, res] = useFollowUnfollowUserMutation();
  const followHandler = (id) => {
    followUnfollowUser(id);
  };
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
    <div className=" px-4" >
      <div className="flex py-2 justify-between relative gap-4 items-center">
        <div className="flex items-center gap-4">
          <div>
            <img
              src={suggestedUser.profilePic}
              className="w-[48px] object-cover h-[48px] rounded-full"
              alt="profile"
            />
          </div>
          <div className="flex flex-col gap-0">
            <h6 className="font-semibold text-sm ">{suggestedUser.username} </h6>
            <p className="font-normal text-sm text-gray-400">{suggestedUser.fullname}</p>
          </div>
        </div>
        <div className="">
          <button
            onClick={() => followHandler(suggestedUser._id)}
            className={`${
              user?.following?.includes(suggestedUser._id)
                ? `bg-gray-200  ${res.isLoading ? "text-gray-200" : ""}  font-semibold hover:bg-gray-300 rounded-md`
                : `button-two ${res.isLoading ? "blue" : "text-white" } font-semibold`
            } px-5 py-1`}
          
          >
            {user?.following?.includes(suggestedUser._id) ? "Following" : "Follow"}
          </button>
        </div>
        {res?.isLoading  ? (
                  <div className={`
                  absolute   ${user?.following?.includes(suggestedUser._id) ? "right-12 " : "right-8 "} 
                  flex items-center justify-center`}>
                    <Loading />
                  </div>
                ) : ""}
      </div>
    </div>
  );
};

export default SuggestionUser;
