import {createApi,fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { FiDatabase } from 'react-icons/fi';

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
            addRecentSearchPerson: builder.mutation({
                query:(person) => {
                    return {
                        url:`add-recent-search`,
                        method:"PUT",
                        body:{person}
                    }
                },
                 invalidatesTags: ["users"],
            }),
            removeRecentSearchPerson: builder.mutation({
                query:(person) => {
                    return {
                        url:`remove-recent-search`,
                        method:"PUT",
                        body:{person}
                    }
                },
                 invalidatesTags: ["users"],
            }),
            clearRecentSearchHistory: builder.mutation({
                query:() => {
                    return {
                        url:`clear-recent-search`,
                        method:"PUT",                      
                    }
                },
                 invalidatesTags: ["users"],
            }),
            changePassword: builder.mutation({
                query:(data) => {
                    return {
                        url:`change-password`,
                        method:"PUT",  
                        body:data                    
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
            getSavedPosts:builder.query({
              query:()=>{
                return {
                  url:`get-saved-posts`,
                  method:"GET"
                }
              },
               providesTags: ["users"],
            }),
            getFollowingUsers:builder.query({
              query:()=>{
                return {
                  url:`get-following-users`,
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
useGetOtherUserPostsQuery,useGetAllUsersQuery,useAddRecentSearchPersonMutation,
useRemoveRecentSearchPersonMutation,useClearRecentSearchHistoryMutation,
useGetSavedPostsQuery,useChangePasswordMutation,useGetFollowingUsersQuery} = userServices

export default userServices

