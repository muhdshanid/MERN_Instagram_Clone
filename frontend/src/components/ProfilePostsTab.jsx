import React, { useContext, useEffect, useState } from "react";

import { DataContext } from "../context/DataProvider";
import {

  useGetLoggedInUserPostsQuery,
} from "../store/services/postServices";
import OtherUserPost from "./OtherUserPost";

import UserPost from "./UserPost";
const ProfilePostsTab = ({user,otherUserPosts,otherUser}) => {
  const { setUserPostsLength } = useContext(DataContext);
  const [userPosts, setUserPosts] = useState([]);
  const { data, isFetching } = useGetLoggedInUserPostsQuery();
 console.log(otherUserPosts);
  useEffect(() => { 
    if (isFetching === false) {
      setUserPosts(data);
      setUserPostsLength(data.length);
    }
  }, [isFetching]);
  return (
    <>
    {
        user === "LoggedInUser" ? 
        <div className="min-h-[44.5vh]">
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
