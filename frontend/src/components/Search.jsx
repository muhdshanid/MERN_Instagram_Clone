import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useAddRecentSearchPersonMutation, useClearRecentSearchHistoryMutation, useGetAllUsersQuery, useRemoveRecentSearchPersonMutation } from '../store/services/userServices';
import { IoClose } from 'react-icons/io5';
import { updateUser } from '../store/reducers/authReducer';
const Search = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.authReducer);
  const [recentSearch, setRecentSearch] = useState([])
  const [allUsers, setAllUsers] = useState([])
  const [search, setSearch] = useState("")
  const {data,isFetching} = useGetAllUsersQuery()
  const [addPerson,res] = useAddRecentSearchPersonMutation()
  const [removePerson,response] = useRemoveRecentSearchPersonMutation()
  const [clearSearch,result] = useClearRecentSearchHistoryMutation()
  useEffect(()=>{
    if(isFetching === false){
      setAllUsers(data)
    }
  },[isFetching])
  useEffect(()=>{
    if(res?.isSuccess) {
    const dataFromLocalStorage =  localStorage.getItem("userData")
    let {user,token} = JSON.parse(dataFromLocalStorage)
    user = res?.data
    localStorage.setItem("userData",JSON.stringify({user,token}))
    dispatch(updateUser(res?.data))
    }
},[res.isSuccess])
useEffect(()=>{
  if(response?.isSuccess) {
  const dataFromLocalStorage =  localStorage.getItem("userData")
  let {user,token} = JSON.parse(dataFromLocalStorage)
  user = response?.data
  localStorage.setItem("userData",JSON.stringify({user,token}))
  dispatch(updateUser(response?.data))
  }
},[response.isSuccess])
useEffect(()=>{
  if(result?.isSuccess) {
  const dataFromLocalStorage =  localStorage.getItem("userData")
  let {user,token} = JSON.parse(dataFromLocalStorage)
  user = result?.data
  localStorage.setItem("userData",JSON.stringify({user,token}))
  dispatch(updateUser(result?.data))
  }
},[result.isSuccess])
  const addRecentSearchPerson = person => {
    addPerson(person)
  }
  const removeRecentSearchPerson = person => {
    removePerson(person)
  }
  const clearRecentSearchHistory = person => {
    clearSearch()
  }
  return (
    <div className='w-full flex  flex-col'>
      <div className='flex w-full flex-col gap-8 m-8 mt-6'>
        <div className='-ml-2'>
          <h1 className='font-semibold text-2xl'>Search</h1>
        </div>
        <div className='  -ml-8 border-b  pb-4 w-full'>
         <div className='px-4 py-1'>
         <input placeholder='Search'
          value={search ? search : ""} onChange={(e)=>setSearch(e.target.value)} type="text" className='bg-gray-100 
          text-lg font-normal px-3 py-1 outline-none w-[22.7rem] rounded-lg text-gray-400' />
         </div>
        </div>
        <div className='-mt-8'>
        { search === "" ? <>
          <div className='flex w-[85%] items-center justify-between'>
          <div className='mt-8'>
            <h6 className='font-semibold text-md'>Recent</h6>
          </div>
          {
            user.searchHistory.length > 0 && <div className='mt-8'>
            <button onClick={()=>clearRecentSearchHistory()} className='font-semibold  cursor-pointer text-md button'>Clear all</button>
          </div>
          }
          </div>
            <div className='flex  flex-col py-3 gap-4'>
          <div>
            <div className=' overflow-y-scroll w-[100%] overflow-x-hidden h-[72vh] -ml-8  '>
          {
           user.searchHistory.length > 0 ? user.searchHistory.map(person => (
              <div className='flex  cursor-pointer justify-between 
                gap-3 pl-6 py-2  w-[100%] items-center hover:bg-gray-100'>
            <div className='flex items-center gap-4'>
            <div>
            <img src={person.profilePic} className='w-[48px] h-[48px] rounded-full' alt="profile" />
            </div>
            <div className='flex flex-col gap-0'>
              <Link to={`/other-profile/${person._id}`}>
              <h6 className='font-semibold text-sm '>{person.fullname}</h6>
              </Link>                                
              <p className='font-normal text-sm text-gray-400'>{person.username}</p>
            </div>
            </div>
            <div className=' pr-4 cursor-pointer'>
              <IoClose onClick={()=>removeRecentSearchPerson(person)} className='text-gray-400' size={25}/>
            </div>
          </div>
            )) : 
            <div className='w-[100%] -mt-8 h-[100%] flex items-center justify-center'>
              <h6 className='text-gray-400 text-sm font-semibold'>No recent searches.</h6>
            </div>
          } 
          </div>
          </div>
          </div>
        </>:  <div className=' overflow-y-scroll  overflow-x-hidden h-[72vh]  -ml-8 mr-8'>
{
  allUsers.length > 0 && search !== ""? allUsers.map(person => (
    person.username.includes(search) && person._id !== user._id  ? 
    <Link key={person._id} onClick={()=>addRecentSearchPerson(person)}
     className='cursor-pointer' to={`/other-profile/${person._id}`}> 
     <div className='flex -ml-8 gap-3 pl-12 py-2 w-[30rem] items-center hover:bg-gray-100'>
    <div>
    <img src={person.profilePic} className='w-[48px] h-[48px] rounded-full' alt="profile" />
    </div>
    <div className='flex flex-col gap-0'>
      
      <h6 className='font-semibold text-sm '>{person.fullname}</h6>
     
      <p className='font-normal text-sm text-gray-400'>{person.username}</p>
    </div>
  </div>  </Link>: ""
  )) : ""
}
 
 </div> 
        }
        </div>
      </div>
    </div>
  )
}

export default Search

