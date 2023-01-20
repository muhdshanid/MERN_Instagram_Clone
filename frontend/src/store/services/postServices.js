import {createApi,fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const postServices = createApi({
    reducerPath: "post",
  tagTypes: "posts",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/post/",
    prepareHeaders: (headers, { getState }) => {
      const reducers = getState();
      const token = reducers?.authReducer?.token;
      headers.set("authorization",  token ? `Bearer ${token}` : "");
      return headers;
    },
  }),
    endpoints:(builder) => {
        return {
            createPost: builder.mutation({
                query:(data) => {
                    return {
                        url:"create-post",
                        method:"POST",
                        body:data
                    }
                }
            }),
            likePost: builder.mutation({
              query:(id) => {
                  return {
                      url:`like/${id}`,
                      method:"PUT",
                  }
              },
              invalidatesTags: ["posts"],
          }),
            commentPost: builder.mutation({
              query:(data) => {
                  return {
                      url:`comment-post`,
                      method:"PUT",
                      body:data
                  }
              },
              invalidatesTags: ["posts"],
          }),
            likeComment: builder.mutation({
              query:(data) => {
                  return {
                      url:`like-comment`,
                      method:"PUT",
                      body:data
                  }
              },
              invalidatesTags: ["posts"],
          }),
            getPosts: builder.query({
                query:() => {
                    return {
                        url:"get-timeline-posts",
                        method:"GET",
                        
                    }
                },
                providesTags: ["posts"],
            }),
            getLoggedInUserPosts: builder.query({
                query:() => {
                    return {
                        url:"get-posts",
                        method:"GET",
                        
                    }
                },
                providesTags: ["posts"],
            }),
            getRandomPosts: builder.query({
                query:() => {
                    return {
                        url:"explore-posts",
                        method:"GET",
                        
                    }
                },
                providesTags: ["posts"],
            }),
            
           
        }
    }
})
export const {useCreatePostMutation,useGetPostsQuery,useLikePostMutation,
useCommentPostMutation,useGetLoggedInUserPostsQuery,useGetRandomPostsQuery
,useLikeCommentMutation} = postServices

export default postServices

