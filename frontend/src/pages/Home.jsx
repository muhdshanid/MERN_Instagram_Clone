import React from 'react'
import Post from '../components/Post'
import RightSideHome from '../components/RightSideHome'

const Home = () => {
  return (
    <div className=' flex  bg-gray-100 w-[70%] ml-[22%]'>
        <Post/>
        <RightSideHome/>
    </div>
        
  )
}

export default Home