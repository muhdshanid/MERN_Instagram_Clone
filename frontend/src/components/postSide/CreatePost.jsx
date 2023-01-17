import React, { useContext, useRef } from 'react'
import {CiImageOn} from 'react-icons/ci'
import { DataContext } from '../../context/DataProvider';
const CreatePost = ({setIsEditPage}) => {
    const {setFile,setImagePreview} = useContext(DataContext)
    const hiddenFileInput = useRef(null);
        const handleClick = event => {
          hiddenFileInput.current.click();
        };
        const handleChange = event => {
           setFile(event.target.files[0]);
           setImagePreview(URL.createObjectURL(event.target.files[0]))
            setIsEditPage(true)
        }; 

  return (
    <div  className='transition-all  mx-auto w-80'>
        <div className='bg-white  rounded-xl  flex flex-col'>
            <div className='w-full border-b flex items-center justify-center'>
            <div className=' py-2 mx-auto'>
                <h4 className='font-semibold text-md '>Create New Post</h4>
            </div>
            </div>
            <div className='flex mt-20 h-[10rem]  items-center justify-center'>
                <div className='flex m-12 gap-0 h-32 relative'>
                <div className='absolute -top-8 -left-14'>
                    <CiImageOn size={100}/>
                </div>
                </div>
            </div>
            <div className='mx-auto -mt-12 mb-4'>
                <h6 className='text-xl'>Drag photos and videos here</h6>
            </div>
            <div className='mx-auto mt-0 mb-20'>
                <label htmlFor="file-input">
                <button onClick={handleClick} 
                className='button-two text-sm font-semibold text-white px-4 py-1.5'>
                    Select from computer 
                </button>
                </label>
                <input type="file"   ref={hiddenFileInput}
        onChange={handleChange}style={{display:"none"}} />
            </div>
        </div>
    </div>
  )
}

export default CreatePost