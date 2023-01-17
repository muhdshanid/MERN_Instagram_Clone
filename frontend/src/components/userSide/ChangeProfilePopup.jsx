import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { updateUser } from '../../store/reducers/authReducer';
import { useUserUpdateDetailsMutation } from '../../store/services/userServices';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../firebase";
import Loading from '../loading/Loading';
import { HiOutlineArrowLeft } from 'react-icons/hi';
const ChangeProfilePopup = ({setProfileChangePopUp}) => {
    const dispatch = useDispatch()
    const defaultProfile = "https://cdn130.picsart.com/318381621277201.jpg"
    const [file, setFile] = useState(null)
    const [previewProfile, setPreviewProfile] = useState()
    const [discardPost, setDiscardPost] = useState(false);
    const [previewPopup, setPreviewPopup] = useState(false)
    const [uploading, setUploading] = useState(false)
    const hiddenFileInput = useRef(null);
    const [updateUserDetails,res] =  useUserUpdateDetailsMutation()
    const removeCurrentProfile = (e) => {
        e.preventDefault()
        updateUserDetails({profilePic:defaultProfile})
    }
        const handleClick = event => { 
          hiddenFileInput.current.click();
        };
        const handleChange = event => {
           setFile(event.target.files[0]);   
           setPreviewProfile(URL.createObjectURL(event.target.files[0]))
           setPreviewPopup(true)
        };
        const handleSubmit = e => {
          e.preventDefault()
          if(file !== null) {
            setUploading(true)
            const filename = new Date().getTime() + file.name
            const storage = getStorage(app)
            const storageRef = ref(storage, filename);
        
        const uploadTask = uploadBytesResumable(storageRef, file);
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on('state_changed', 
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
            }
          }, 
          (error) => {
            // Handle unsuccessful uploads
          }, 
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                updateUserDetails({profilePic:downloadURL})
                setUploading(false)
                setFile(null)
            });
          })
          } 
        }
        useEffect(()=>{
            if(res.isSuccess) {
              const dataFromLocalStorage =  localStorage.getItem("userData")
              let {user,token} = JSON.parse(dataFromLocalStorage)
              user = res?.data
              localStorage.setItem("userData",JSON.stringify({user,token}))
              dispatch(updateUser(res?.data))
              setProfileChangePopUp(false)
            }
          },[res?.isSuccess])
  return (
    <div className={` ${previewPopup ? "top-[10%] w-[22.5%] left-[37%] h-[25rem]" : "top-[30%] left-[35%] w-[28%]"}
     absolute bg-white flex flex-col transition-all rounded-lg`}>
        
        {
          previewPopup ?
        <div className="w-[100%] h-[50%]   relative transition-all mx-auto">
        <div className="bg-white  rounded-xl flex flex-col">
          <div className="w-full px-3 py-2 flex items-center justify-between">
            <div>
              <HiOutlineArrowLeft
                className="cursor-pointer"
                onClick={() => setDiscardPost(true)}
                size={30}
              />
            </div>
            <div className="  mx-auto">
              <h4 className="font-semibold text-md ">Preview</h4>
            </div>
            <div className='relative'>
              <h6
                onClick={handleSubmit}
                className={` font-semibold ${res?.isLoading || uploading ? "text-white" : "button"}`} >
                Upload
              </h6>
              {res?.isLoading || uploading  ? (
                <div className="absolute  left-4 top-0  mx-auto flex items-center justify-center">
                  <Loading />
                </div>
              ) : ""}
            </div>
          </div>
          <div className="bg-black flex items-center w-[20.3rem]
            h-[23rem] relative rounded-br-xl rounded-bl-xl">
            <div className="p-1">        
                <img
                  src={previewProfile}
                  className=" object-contain w-[20.3rem] h-[23rem]"
                  alt="profile"
                />
            </div>
          </div>
        </div>
        {discardPost && (
          <div className="bg-white absolute  transition-all
           -left-12 top-[7rem]  h-[12rem] w-[26rem] rounded-xl">
            <div className="w-full  border-b">
              <div className="flex flex-col m-8 mb-6">
                <div className="flex flex-col items-center gap-2 -mt-2 ">
                  <div className="font-normal text-xl text-md">
                    Discard post?{" "}
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 font-normal">
                      If you leave, your edits won't be saved.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div
              onClick={() =>{ setPreviewPopup(false)
                 setDiscardPost(false)}}
              className="w-full cursor-pointer     border-b"
            >
              <div className="flex m-3 items-center justify-center">
                <h6 className="text-sm  font-bold text-red-500">Discard</h6>
              </div>
            </div>
            <div
              onClick={() => setDiscardPost(false)}
              className="flex mt-2 items-center cursor-pointer  justify-center"
            >
              <h6 className="text-sm  font-normal">Cancel</h6>
            </div>
          </div>
        )}
      </div> :    <div className='transition-all'> <div className='border-b'>
          <div className='p-6 flex items-center justify-center'>
              <h6 className='text-xl '>Change Profile Photo</h6>
          </div>
      </div>
      <div onClick={handleClick} className='border-b cursor-pointer'>
          <div className='p-3.5 flex items-center justify-center'>
              <h6 className={`text-sm 
              text-blue-600   font-bold`}>Upload Photo</h6>
          </div>
          <input type="file"   ref={hiddenFileInput}
      onChange={(e)=>handleChange(e)} style={{display:"none"}} />
      </div>
      <div className='border-b cursor-pointer '>
          <div className='flex items-center justify-center p-3.5'>
          <button onClick={removeCurrentProfile} disabled={res?.isLoading || uploading} className='text-sm  font-bold text-red-500'>Remove Current Photo</button>
          </div>
      </div>
      <div onClick={()=>setProfileChangePopUp(false)} className='flex cursor-pointer items-center justify-center p-3.5'>
          <button disabled={res?.isLoading || uploading} className='text-sm   font-normal'>Cancel</button>
      </div> </div>
        }
    </div> 
  )
}

export default ChangeProfilePopup