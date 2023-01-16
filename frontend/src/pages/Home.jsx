import React, { useEffect, useState } from 'react'
import Post from '../components/Post'
import RightSideHome from '../components/RightSideHome'
import { useGetPostsQuery } from '../store/services/postServices'

const Home = () => {
  const [posts, setPosts] = useState([])
  const {data,isFetching} = useGetPostsQuery()
  useEffect(()=>{
    if(isFetching === false){
      setPosts(data)
    }
  },[isFetching])
  return (
    <div className='flex  bg-gray-100 min-h-screen w-[100%]  ml-[22%]'>
      <div className='flex   w-[53%]  mt-4 flex-col gap-8' >
        {
          posts.length > 0 &&   posts.map((post,i) => (
              <Post post={post} key={i} />
            
          ))
        }
        </div>
       <RightSideHome/>
    </div>
        
  )
}

export default Home