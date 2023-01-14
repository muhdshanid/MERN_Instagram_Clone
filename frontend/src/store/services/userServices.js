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
           
        }
    }
})
export const {useUserUpdateDetailsMutation} = userServices

export default userServices

