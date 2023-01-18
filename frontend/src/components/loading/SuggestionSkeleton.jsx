import React from 'react'
import Animate from './Animate'

const Skeleton = () => {
  return (
    <div className='bg-transparent -ml-6 mt-2 flex w-full gap-4'>
          <div className='w-8 h-8 rounded-full  bg-indigo-50 overflow-hidden relative'>
        <Animate/>
    </div>
        <div className='flex flex-col gap-2 mt-2'>
        <div  className='w-[200px] h-2 rounded-md  bg-indigo-50 overflow-hidden relative'>
        <Animate/>
    </div>
        <div  className='w-[150px] h-2 rounded-md  bg-indigo-50 overflow-hidden relative'>
        <Animate/>
    </div>
        </div>
    </div>

  )
}

export default Skeleton