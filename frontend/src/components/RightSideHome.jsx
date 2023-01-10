import React from 'react'
import profile from "../assets/images/profile.jpg";
import SuggestionUsers from './SuggestionUsers';
// import '../App.css'
const RightSideHome = () => {
  return (
    <div className='mt-[4rem]  ml-4 w-4/12'>
        <div className="w-[80%] ">
        <div className='p-3 -ml-4'>
            <div className='flex gap-4 items-center  justify-between'>
                <div>
                    <img className='w-[50px] h-[50px] rounded-full' src={profile}alt="profile" />
                </div>
                <div className='flex flex-col grow'>
                    <h6 className='font-semibold text-sm'>Cristiano</h6>
                    <p className='text-gray-400 text-sm'>cristianoronaldo</p>
                </div>
                <div>
                    <button className='button text-sm' >Switch</button>
                </div>
            </div>
        </div>
        <SuggestionUsers/>
        </div>
    </div>
  )
}

export default RightSideHome