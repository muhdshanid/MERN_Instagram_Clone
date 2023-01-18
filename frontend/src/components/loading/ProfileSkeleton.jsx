import React from 'react'
import Animate from './Animate'

const ProfileSkeleton = () => {
  return (
    <div className='bg-transparent   -ml-6 mt-2 flex z-10  gap-20'>
    <div className='w-[150px] px-4 py-3 ml-10 h-[150px] rounded-full  bg-indigo-50 sticky  overflow-hidden '>
  <Animate/>
</div>
  <div className='flex flex-col gap-2 mt-6'>
  <div  className='w-[300px] h-[30px] rounded-md  bg-indigo-50 sticky  overflow-hidden '>
  <Animate/>
</div>
  <div  className='w-[250px] h-[30px] rounded-md  bg-indigo-50 sticky  overflow-hidden '>
  <Animate/>
</div>
  <div  className='w-[250px] h-[30px] rounded-md  bg-indigo-50 sticky  overflow-hidden '>
  <Animate/>
</div>
  </div>
</div>
  )
}

export default ProfileSkeleton