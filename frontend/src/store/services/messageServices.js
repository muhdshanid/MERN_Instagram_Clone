import {createApi,fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const messageService = createApi({
    reducerPath: "message",
  tagTypes: "messages",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/message/",
    prepareHeaders: (headers, { getState }) => {
      const reducers = getState();
      const token = reducers?.authReducer?.token;
      headers.set("authorization",  token ? `Bearer ${token}` : "");
      return headers;
    },
  }),
    endpoints:(builder) => {
        return {
            createMessage: builder.mutation({
                query:(data) => {
                    return {
                        url:"new",
                        method:"POST",
                        body:data
                    }
                },
                invalidatesTags:["messages"]
            }),
            getMessages: builder.query({
                query:(id) => {
                    return {
                        url:`get-messages/${id}`,
                        method:"GET",
                        
                    }
                },
                providesTags: ["messages"],
            }),
            
           
        }
    }
})
export const {useCreateMessageMutation,useGetMessagesQuery} = messageService

export default messageService

