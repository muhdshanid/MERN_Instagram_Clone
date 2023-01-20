import React from 'react'
import Animate from './Animate'

const ProfileSkeleton = () => {
  return (
    <div className='bg-transparent   flex items-center justify-center   z-10  gap-6'>
    <div className='w-[50px]  h-[50px] rounded-full  bg-indigo-50 sticky  overflow-hidden '>
  <Animate/>
</div>
  <div className='flex flex-col gap-2 '>
  <div  className='w-[200px] h-[10px] rounded-md  bg-indigo-50 sticky  overflow-hidden '>
  <Animate/>
</div>
  <div  className='w-[200px] h-[10px] rounded-md  bg-indigo-50 sticky  overflow-hidden '>
  <Animate/>
</div>
  </div>
</div>
  )
}

export default ProfileSkeleton