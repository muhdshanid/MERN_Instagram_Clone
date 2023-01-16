import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useGetAllUsersQuery } from '../store/services/userServices';
import profile from '../assets/images/profile.jpg'
import { IoClose } from 'react-icons/io5';
const Search = () => {
  const { user } = useSelector((state) => state.authReducer);
  const [recentSearch, setRecentSearch] = useState([])
  const [allUsers, setAllUsers] = useState([])
  const [search, setSearch] = useState("")
  const {data,isFetching} = useGetAllUsersQuery()
  useEffect(()=>{
    if(isFetching === false){
      setAllUsers(data)
    }
  },[isFetching])
  const handleRecentSearch = person => {
    setRecentSearch([...recentSearch,person])
  }
  console.log(recentSearch);
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
          <div className='mt-8'>
            <button className='font-semibold text-md button'>Clear all</button>
          </div>
          </div>
            <div className='flex  flex-col py-3 gap-4'>
          <div>
            <div className=' overflow-y-scroll w-[100%] overflow-x-hidden h-[72vh] -ml-8  '>
          {
            recentSearch.map(person => (
              <div className='flex  justify-between 
                gap-3 pl-6 py-2  w-[100%] items-center hover:bg-gray-100'>
            <div className='flex items-center gap-4'>
            <div>
            <img src={person.profilePic} className='w-[48px] h-[48px] rounded-full' alt="profile" />
            </div>
            <div className='flex flex-col gap-0'>
              
              <h6 className='font-semibold text-sm '>{person.fullname}</h6>
             
              <p className='font-normal text-sm text-gray-400'>{person.username}</p>
            </div>
            </div>
            <div className=' pr-4 '>
              <IoClose className=' cursor-pointer' size={25}/>
            </div>
          </div>
            )) 
          } 
          </div>
          </div>
          </div>
        </>:  <div className=' overflow-y-scroll  overflow-x-hidden h-[72vh]  -ml-8 mr-8'>
{
  allUsers.length > 0 && search !== ""? allUsers.map(person => (
    person.username.includes(search) && person._id !== user._id  ? 
    <Link key={person._id} onClick={()=>handleRecentSearch(person)}
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

