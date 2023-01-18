import React from 'react'
import { BsCameraVideo, BsInfoCircle } from 'react-icons/bs'
import { FaRegSmile } from 'react-icons/fa'
import { FiSend } from 'react-icons/fi'
import { IoCallOutline } from 'react-icons/io5'
import { useSelector } from 'react-redux'

const Messages = () => {
    const {user} = useSelector(state => state.authReducer)

  return (
    <div className='flex  bg-gray-100 min-h-screen w-[100%]  ml-[20%]'>
         <div className='m-6 flex rounded bg-white border w-full h-[90vh]'>
            <div className='border-r w-[35%] h-full'>
                <div className='border-b h-[12%]'>
                    <div className='flex h-full items-center justify-center'>
                        <h6 className='font-semibold text-md'>{user.fullname}</h6>
                    </div>
                </div>
                <div className='w-full h-[79vh] overflow-hidden overflow-y-scroll'>
                <div className=' p-4 hover:bg-gray-100'>
                    <div className='flex  gap-4 items-center'>
                        <div>
                            <img src={user.profilePic} className='w-9 h-9 rounded-full object-cover' alt="profile" />
                        </div>
                        <div>
                            <h6>{user.fullname}</h6>
                        </div>
                    </div>
                </div>
                <div className=' p-4 hover:bg-gray-100'>
                    <div className='flex  gap-4 items-center'>
                        <div>
                            <img src={user.profilePic} className='w-9 h-9 rounded-full object-cover' alt="profile" />
                        </div>
                        <div>
                            <h6>{user.fullname}</h6>
                        </div>
                    </div>
                </div>
                <div className=' p-4 hover:bg-gray-100'>
                    <div className='flex  gap-4 items-center'>
                        <div>
                            <img src={user.profilePic} className='w-9 h-9 rounded-full object-cover' alt="profile" />
                        </div>
                        <div>
                            <h6>{user.fullname}</h6>
                        </div>
                    </div>
                </div>
                <div className=' p-4 hover:bg-gray-100'>
                    <div className='flex  gap-4 items-center'>
                        <div>
                            <img src={user.profilePic} className='w-9 h-9 rounded-full object-cover' alt="profile" />
                        </div>
                        <div>
                            <h6>{user.fullname}</h6>
                        </div>
                    </div>
                </div>
                <div className=' p-4 hover:bg-gray-100'>
                    <div className='flex  gap-4 items-center'>
                        <div>
                            <img src={user.profilePic} className='w-9 h-9 rounded-full object-cover' alt="profile" />
                        </div>
                        <div>
                            <h6>{user.fullname}</h6>
                        </div>
                    </div>
                </div>
                <div className=' p-4 hover:bg-gray-100'>
                    <div className='flex  gap-4 items-center'>
                        <div>
                            <img src={user.profilePic} className='w-9 h-9 rounded-full object-cover' alt="profile" />
                        </div>
                        <div>
                            <h6>{user.fullname}</h6>
                        </div>
                    </div>
                </div>
                <div className=' p-4 hover:bg-gray-100'>
                    <div className='flex  gap-4 items-center'>
                        <div>
                            <img src={user.profilePic} className='w-9 h-9 rounded-full object-cover' alt="profile" />
                        </div>
                        <div>
                            <h6>{user.fullname}</h6>
                        </div>
                    </div>
                </div>
                <div className=' p-4 hover:bg-gray-100'>
                    <div className='flex  gap-4 items-center'>
                        <div>
                            <img src={user.profilePic} className='w-9 h-9 rounded-full object-cover' alt="profile" />
                        </div>
                        <div>
                            <h6>{user.fullname}</h6>
                        </div>
                    </div>
                </div>
                <div className=' p-4 hover:bg-gray-100'>
                    <div className='flex  gap-4 items-center'>
                        <div>
                            <img src={user.profilePic} className='w-9 h-9 rounded-full object-cover' alt="profile" />
                        </div>
                        <div>
                            <h6>{user.fullname}</h6>
                        </div>
                    </div>
                </div>
                <div className=' p-4 hover:bg-gray-100'>
                    <div className='flex  gap-4 items-center'>
                        <div>
                            <img src={user.profilePic} className='w-9 h-9 rounded-full object-cover' alt="profile" />
                        </div>
                        <div>
                            <h6>{user.fullname}</h6>
                        </div>
                    </div>
                </div>
                </div>
            </div>
            <div className='w-[65%] h-full'>
                <div className='border-b h-[12%]'>
                    <div className='p-4 flex  items-center justify-between'>
                        <div className='px-8'>
                        <div className='flex  gap-4 items-center'>
                        <div>
                            <img src={user.profilePic} className='w-8 h-8 rounded-full object-cover' alt="profile" />
                        </div>
                        <div>
                            <h6>{user.fullname}</h6>
                        </div>
                    </div>
                        </div>
                        <div className='px-8'>
                            <div className='flex gap-4'>
                                <IoCallOutline size={27}/>
                                <BsCameraVideo size={27}/>
                                <BsInfoCircle size={27}/>
                            </div>
                        </div>
                    </div>
                    <div className='w-full h-[65vh]'></div>
                    <div>
                        <div className='flex p-4 '>
                            <div className='flex py-2 px-5 justify-between rounded-full w-full border'>
                                <FaRegSmile size={27}/>
                                <input type="text" className='outline-none 
                                px-2 grow placeholder:text-gray-300'
                                 placeholder='Message...' />
                                 <FiSend size={27}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         </div>
    </div>
  )
}

export default Messages