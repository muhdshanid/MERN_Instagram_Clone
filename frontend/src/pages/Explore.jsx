import React, { useEffect, useState } from 'react'
import Loading from '../components/loading/Loading'
import ExplorePosts from '../components/postSide/ExplorePosts'
import { useGetRandomPostsQuery } from '../store/services/postServices'

const Explore = () => {
    const [randomPosts, setRandomPosts] = useState([])
    const {data,isFetching} = useGetRandomPostsQuery()
    useEffect(()=>{
        if(isFetching === false){
            setRandomPosts(data)
        }
    },[isFetching])
  return (
    <div className='flex  bg-gray-100 min-h-screen w-[100%]  ml-[20%]'>
        <div className='p-8 w-full'>
               {
                isFetching === true ? <div className='flex items-center -mt-10 min-h-screen w-[70vw]  justify-center'>
                <Loading/>
              </div> :
               <div className='flex bg-gray-100 flex-wrap gap-4'>
                {randomPosts.length > 0 ?
                randomPosts.map(post => (
                  <ExplorePosts key={post._id} post={post} />
                  )) : ""
                }
                </div>
               }
            </div>
        </div>
  )
}

export default Explore