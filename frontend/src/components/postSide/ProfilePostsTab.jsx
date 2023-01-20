import React, { useContext, useEffect, useState } from "react";

import { DataContext } from "../../context/DataProvider";
import {

  useGetLoggedInUserPostsQuery,
} from "../../store/services/postServices";
import Loading from "../loading/Loading";
import OtherUserPost from "../userSide/OtherUserPost";

import UserPost from "../userSide/UserPost";
const ProfilePostsTab = ({user,otherUserPosts,otherUser}) => {
  const { setUserPostsLength } = useContext(DataContext);
  const [userPosts, setUserPosts] = useState([]);
  const { data, isFetching } = useGetLoggedInUserPostsQuery();
  useEffect(() => { 
    if (isFetching === false) {
      setUserPosts(data);
      setUserPostsLength(data.length);
    }
  }, [isFetching]);
  return (
    <>
    {
       isFetching === true ? 
       <div className='flex items-center -ml-20 min-h-[44.5vh] bg-gray-100 justify-center'>
            <Loading/>
          </div>
       :  user === "LoggedInUser" ? 
       <div className="min-h-[60vh]">
       <div className="flex flex-wrap gap-8">
         {userPosts.length > 0
           ? userPosts.map((post) => (
               <UserPost key={post._id} post={post}/>
             ))
           : ""}
       </div>
     </div>
     :
     <div className="min-h-[44.5vh]">
       <div className="flex flex-wrap gap-8">
         {otherUserPosts.length > 0
           ? otherUserPosts.map((post) => (
               
               <OtherUserPost key={post._id} otherUser={otherUser} post={post}/>
             ))
           : ""}
       </div>
     </div>
    }
    </>
  );
};

export default ProfilePostsTab;
