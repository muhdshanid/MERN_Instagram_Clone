import {createApi,fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const userServices = createApi({
    reducerPath: "user",
  tagTypes: "users",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/user/",
    prepareHeaders: (headers, { getState }) => {
      const reducers = getState();
      const token = reducers?.authReducer?.token;
      headers.set("authorization",  token ? `Bearer ${token}` : "");
      return headers;
    },
  }),
    endpoints:(builder) => {
        return {
            userUpdateDetails: builder.mutation({
                query:(data) => {
                    return {
                        url:"update-user",
                        method:"PUT",
                        body:data
                    }
                }
            }),
            followUnfollowUser: builder.mutation({
                query:(id) => {
                    return {
                        url:`follow-unfollow-user/${id}`,
                        method:"PUT",
                    }
                },
                 invalidatesTags: ["users"],
            }),
            saveUnsavePost: builder.mutation({
                query:(id) => {
                    return {
                        url:`save-post/${id}`,
                        method:"PUT",
                    }
                },
                 invalidatesTags: ["users"],
            }),
            getSuggestionUsers:builder.query({
              query:()=>{
                return {
                  url:"suggestion-users",
                  method:"GET"
                }
              },
              // providesTags: ["users"],
            }),
            getPostedUser:builder.query({
              query:(id)=>{
                return {
                  url:`get-posted-user/${id}`,
                  method:"GET"
                }
              }
            }),
            getUser:builder.query({
              query:(id)=>{
                return {
                  url:`get-user/${id}`,
                  method:"GET"
                }
              },
               providesTags: ["users"],
            }),
            getOtherUserPosts:builder.query({
              query:(id)=>{
                return {
                  url:`get-other-user/${id}`,
                  method:"GET"
                }
              },
               providesTags: ["users"],
            }),
            getAllUsers:builder.query({
              query:()=>{
                return {
                  url:`all-users`,
                  method:"GET"
                }
              },
               providesTags: ["users"],
            }),
           
        }
    }
})
export const {useUserUpdateDetailsMutation,
  useGetSuggestionUsersQuery,useGetPostedUserQuery,
useFollowUnfollowUserMutation,useGetUserQuery,useSaveUnsavePostMutation,
useGetOtherUserPostsQuery,useGetAllUsersQuery} = userServices

export default userServices

