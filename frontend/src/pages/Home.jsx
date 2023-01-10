import React from 'react'
import Post from '../components/Post'
import RightSideHome from '../components/RightSideHome'

const Home = () => {
  return (
    <div className=' flex bg-gray-100 w-full ml-[16rem]'>
        <Post/>
        <RightSideHome/>
    </div>
  )
}

export default Home