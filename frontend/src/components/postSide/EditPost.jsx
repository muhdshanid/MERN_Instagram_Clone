import React, {  useContext, useEffect, useState } from "react";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Switch from "react-switch";
import "react-image-crop/dist/ReactCrop.css";
import { FaRegSmile } from "react-icons/fa";
import {useNavigate} from 'react-router-dom'
import { IoImagesOutline } from "react-icons/io5";
import { VscChevronDown, VscChevronUp } from "react-icons/vsc";
import { DataContext } from "../../context/DataProvider";
import { useSelector } from "react-redux";
import app from "../../firebase";
import { useCreatePostMutation } from "../../store/services/postServices";
import Loading from "../loading/Loading";
const EditPost = ({ setIsEditPage,setModalOpen }) => {
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.authReducer);
  const [title, setTitle] = useState("")
  const [uploading, setUploading] = useState(false)
  const [isPostPage, setIsPostPage] = useState(false);
  const [advSettingOpen, setAdvSettingOpen] = useState(false);
  const [discardPost, setDiscardPost] = useState(false);
  const { imagePreview,file } = useContext(DataContext);
  const [createPost,res] = useCreatePostMutation()
  useEffect(()=>{
    if(res.isSuccess){
      navigate("/")
      setModalOpen(false)
      setIsEditPage(false)
      window.location.reload()
    }
  },[res.isSuccess])
  const handlePost = (e) => {
    e.preventDefault()
    if(file !== null) {
      setUploading(true)
      const filename = new Date().getTime() + file?.name
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
        if(title !== ""){
          createPost({title,image:downloadURL,postedBy:user._id})
          setUploading(false)
        }
      });
    })
    }

  }
  return (
    <>
      {isPostPage === false ? (
        <div className="w-80 relative transition-all mx-auto">
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
              <div>
                <h6
                  onClick={() => setIsPostPage(true)}
                  className="button font-semibold"
                >
                  Next
                </h6>
              </div>
            </div>
            <div className="bg-black flex items-center w-[20rem]
              h-[22rem] relative rounded-br-xl rounded-bl-xl">
              <div className="p-1">        
                  <img
                    src={imagePreview}
                    className=" object-contain w-[20rem] h-[21rem]"
                    alt="profile"
                  />
              </div>
              {/* <div className="absolute bottom-2 left-2  text-white ">
                <div
                  onClick={() => setCropSelected(!cropSelected)}
                  className={`
                p-2 rounded-lg ${
                  cropSelected ? "bg-gray-900 " : "bg-transparent "
                } `}
                >
                  <RxCrop size={26} />
                </div>
              </div> */}
              <div className="absolute bottom-2 right-2  text-white">
                <div className="p-2 rounded-lg hover:bg-gray-900">
                  <IoImagesOutline size={26} />
                </div>
              </div>
            </div>
          </div>
          {discardPost && (
            <div className="bg-white absolute  transition-all -left-8 top-[7rem]  h-[12rem] w-[26rem] rounded-xl">
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
                onClick={() => setIsEditPage(false)}
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
        </div>
      ) : (
        <div className="w-[50%] transition-all mx-auto ">
          <div className="bg-white  rounded-xl flex flex-col">
            <div className="w-full border-b px-3 flex  items-center justify-between">
              <div>
                <HiOutlineArrowLeft
                  onClick={() => setIsPostPage(false)}
                  className=" cursor-pointer"
                  size={30}
                />
              </div>
              <div className={`py-2  ${res.isLoading || uploading ? "-ml-10" : "mx-auto"}`}>
                <h4 className={`font-semibold text-md `}>Create New Post</h4>
              </div>
              <div className="relative ">
                <button  onClick={handlePost} className={` ${res.isLoading || uploading ? 
                "hidden" : "button cursor-pointer  font-semibold"}`}>
                  {
                    res?.isLoading || uploading ? "" : "Share"
                  }
                </button>
                {res?.isLoading || uploading ? (
                  <div className="absolute w-80 -mt-3 -left-[11rem] flex items-center justify-center">
                    <Loading />
                  </div>
                ) : ""}
              </div>
            </div>
            <div className="flex ">
              <div className="bg-black w-full rounded-bl-xl">
                <div className="p-1 w-full h-[23rem]">
                  <img
                    src={imagePreview}
                    className="w-full h-full object-contain"
                    alt="profile"
                  />
                </div>
              </div>
              <div className="flex max-h-[63.2vh] w-full flex-col gap-1 overflow-hidden overflow-y-scroll">
                <div className="flex items-center p-4 gap-3">
                  <div>
                    <img
                      src={user.profilePic}
                      alt="profile"
                      className="w-[2rem] h-[2rem] rounded-full"
                    />
                  </div>
                  <div className="flex flex-col">
                    <h6 className="text-md font-semibold">{user.username}</h6>
                  </div>
                </div>
                <div className="px-4 relative pb-1 border-b">
                  <textarea
                    placeholder="Write a caption..."
                    name="caption"
                    id=""
                    cols="30"
                    onChange={(e)=>setTitle(e.target.value)}
                    value={title}
                    rows="10"
                    className="border-none h-52 w-full outline-none placeholder:text-gray-500 text-md"
                  ></textarea>
                  <div className="text-gray-400 flex justify-between items-center">
                    <FaRegSmile  size={23} />
                    <p className="text-sm text-gray-400 font-normal">2/2200</p>
                  </div>
                
                </div>
                <div className="px-4 py-2 border-b  ">
                  <div className="flex items-center justify-between">
                    <h6 className="font-medium text-md ">Advanced settings</h6>
                    {advSettingOpen ? (
                      <VscChevronUp
                        onClick={() => setAdvSettingOpen(false)}
                        className=" cursor-pointer"
                        size={26}
                      />
                    ) : (
                      <VscChevronDown
                        onClick={() => setAdvSettingOpen(true)}
                        className=" cursor-pointer"
                        size={26}
                      />
                    )}
                  </div>
                  {advSettingOpen && (
                    <>
                      <div className="flex flex-col py-2 items-center">
                        <div className="flex items-center justify-between">
                          <p className="font-normal text-md ">
                            Hide like and view counts on this post
                          </p>
                          <Switch />
                        </div>
                        <div className="py-2">
                          <p className="text-xs leading-4 text-gray-400 font-normal">
                            Only you will see the total number of likes and
                            views on this post. You can change this later by
                            going to the ··· menu at the top of the post. To
                            hide like counts on other people's posts, go to your
                            account settings.
                            <span className="text-blue-900 hover:underline">
                              {" "}
                              Learn more
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col py-2 items-center">
                        <div className="flex items-center gap-16 justify-between">
                          <div>
                            <p className="font-normal text-md ">
                              Turn off commenting
                            </p>
                          </div>
                          <div>
                            <Switch />
                          </div>
                        </div>
                        <div className="py-2">
                          <p className="text-xs leading-4 text-gray-400 font-normal">
                            You can change this later by going to the ··· menu
                            at the top of your post.
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditPost;
