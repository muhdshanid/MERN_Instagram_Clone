import React from 'react'
import profile from "../assets/images/profile.jpg";
const SuggestionUsers = () => {
  return (
    <div className='ml-4'>
        <div className='flex justify-between mb-4 -ml-6 items-center'>
            <h6 className='text-gray-400 font-semibold'>Suggestions For You</h6>
            <h6 className='text-xs font-semibold'>See All</h6>
        </div>
       <div className="flex flex-col gap-4">
       <div className='flex gap-4 items-center justify-between'>
            <div className='-ml-4'>
                <img src={profile} className='w-[30px] h-[30px] rounded-full' alt="" />
            </div>
            <div className='-ml-2 grow'>
                <h6 className='font-semibold text-sm'>Cristiano</h6>
            </div>
            <div>
                <button className='button text-sm'>Follow</button>
            </div>
        </div>
       <div className='flex gap-4 items-center justify-between'>
            <div className='-ml-4'>
                <img src={profile} className='w-[30px] h-[30px] rounded-full' alt="" />
            </div>
            <div className='-ml-2 grow'>
                <h6 className='font-semibold text-sm'>Cristiano</h6>
            </div>
            <div>
                <button className='button text-sm'>Follow</button>
            </div>
        </div>
       <div className='flex gap-4 items-center justify-between'>
            <div className='-ml-4'>
                <img src={profile} className='w-[30px] h-[30px] rounded-full' alt="" />
            </div>
            <div className='-ml-2 grow'>
                <h6 className='font-semibold text-sm'>Cristiano</h6>
            </div>
            <div>
                <button className='button text-sm'>Follow</button>
            </div>
        </div>
       <div className='flex gap-4 items-center justify-between'>
            <div className='-ml-4'>
                <img src={profile} className='w-[30px] h-[30px] rounded-full' alt="" />
            </div>
            <div className='-ml-2 grow'>
                <h6 className='font-semibold text-sm'>Cristiano</h6>
            </div>
            <div>
                <button className='button text-sm'>Follow</button>
            </div>
        </div>
       <div className='flex gap-4 items-center justify-between'>
            <div className='-ml-4'>
                <img src={profile} className='w-[30px] h-[30px] rounded-full' alt="" />
            </div>
            <div className='-ml-2 grow'>
                <h6 className='font-semibold text-sm'>Cristiano</h6>
            </div>
            <div>
                <button className='button text-sm'>Follow</button>
            </div>
        </div>
       <div className='flex gap-4 items-center justify-between'>
            <div className='-ml-4'>
                <img src={profile} className='w-[30px] h-[30px] rounded-full' alt="" />
            </div>
            <div className='-ml-2 grow'>
                <h6 className='font-semibold text-sm'>Cristiano</h6>
            </div>
            <div>
                <button className='button text-sm'>Follow</button>
            </div>
        </div>
       <div className='flex gap-4 items-center justify-between'>
            <div className='-ml-4'>
                <img src={profile} className='w-[30px] h-[30px] rounded-full' alt="" />
            </div>
            <div className='-ml-2 grow'>
                <h6 className='font-semibold text-sm'>Cristiano</h6>
            </div>
            <div>
                <button className='button text-sm'>Follow</button>
            </div>
        </div>
       </div>
    </div>
  )
}

export default SuggestionUsers