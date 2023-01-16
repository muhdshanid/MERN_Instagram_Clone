import React, { useEffect, useState } from 'react'
import SuggestionUser from '../components/SuggestionUser'
import { useGetSuggestionUsersQuery } from '../store/services/userServices'
const Suggested = () => {
  const [suggestionUsers, setSuggestionUsers] = useState([])
  const {data,isFetching} = useGetSuggestionUsersQuery()
  useEffect(()=>{
      if(isFetching === false){
          setSuggestionUsers(data)
      }
  },[])
 
  return (
    <div className='flex flex-col gap-2 bg-gray-100 min-h-screen h-auto w-[78%] ml-[22%]'>
        <div className='ml-[11.5rem] w-[37rem] mt-[5rem]'>
            <h1 className='font-semibold text-lg'>Suggested</h1>
        </div>
        <div className='ml-[11rem] mb-10 w-[37rem] rounded-sm  bg-white/50 '>
           {
            suggestionUsers?.slice(0,20).map(user => (
             <SuggestionUser suggestedUser={user}/>
            ))
           }
        </div>
    </div>
  )
}

export default Suggested