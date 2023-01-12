import React, { useState } from "react";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { RxCrop } from "react-icons/rx";
import profile from "../assets/images/profile.jpg";
import ReactCrop from "react-image-crop";
import Switch from "react-switch";
import "react-image-crop/dist/ReactCrop.css";
import { FaRegSmile } from "react-icons/fa";
import { IoImagesOutline } from "react-icons/io5";
import { VscChevronDown, VscChevronUp } from "react-icons/vsc";
const EditPost = ({setIsEditPage}) => {
  const [crop, setCrop] = useState();
  const [cropSelected, setCropSelected] = useState(false);
  const [isPostPage, setIsPostPage] = useState(false);
  const [advSettingOpen, setAdvSettingOpen] = useState(false)
  const [discardPost, setDiscardPost] = useState(false)
  console.log(crop);
  return (
    <>
      {isPostPage === false ? (
        <div className="w-[22rem] relative transition-all mx-auto mt-[5rem]">
          <div className="bg-white  rounded-xl flex flex-col">
            <div className="w-full px-3 py-2 flex items-center justify-between">
              <div>
                <HiOutlineArrowLeft className="cursor-pointer" onClick={()=>setDiscardPost(true)}  size={30} />
              </div>
              <div className="  mx-auto">
                <h4 className="font-semibold text-md ">Crop</h4>
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
            <div className="bg-black  relative rounded-br-xl rounded-bl-xl">
              <div className="p-2  w-[22rem] h-[23rem]">
                {cropSelected ? (
                  <ReactCrop
                    ruleOfThirds={true}
                    minHeight={"200px"}
                    minWidth="200px"
                    crop={crop}
                    onChange={(c) => setCrop(c)}
                  >
                    <img
                      src={profile}
                      alt="post"
                      className="w-[21rem] h-[22rem]"
                    />
                  </ReactCrop>
                ) : (
                  <img
                    src={profile}
                    className="w-full h-full rounded-full"
                    alt="profile"
                  />
                )}
              </div>
              <div className="absolute bottom-2 left-2  text-white ">
                <div
                  onClick={() => setCropSelected(!cropSelected)}
                  className={`
                p-2 rounded-lg ${
                  cropSelected ? "bg-gray-900 " : "bg-transparent "
                } `}
                >
                  <RxCrop size={26} />
                </div>
              </div>
              <div className="absolute bottom-2 right-2  text-white">
                <div className="p-2 rounded-lg hover:bg-gray-900">
                  <IoImagesOutline size={26} />
                </div>
              </div>
            </div>
          </div>
          {
            discardPost && 
            <div className="bg-white absolute  transition-all -left-8 top-[7rem]  h-52 w-[26rem] rounded-xl">
           <div className="w-full  border-b">
           <div className="flex flex-col m-8 mb-6">
                <div className="flex flex-col items-center gap-2 -mt-2 ">
                    <div className="font-normal text-xl text-md">Discard post? </div>
                    <div>
                        <p className="text-sm text-gray-400 font-normal">If you leave, your edits won't be saved.</p>
                    </div>
                </div>
            </div>
           </div>
           <div  onClick={()=>setIsEditPage(false)} className="w-full cursor-pointer  border-b">
           <div className="flex m-3 items-center   justify-center">
                    <h6 className="text-sm  font-bold text-red-500">Discard</h6>
                </div>
            </div>  
            <div onClick={()=>setDiscardPost(false)} className="flex m-4 items-center cursor-pointer  justify-center">
                    <h6  className="text-sm  font-normal">Cancel</h6>
                </div>     
          </div>
          }
        </div>
      ) : (
        <div className="w-[42rem] transition-all mx-auto mt-[5rem]">
          <div className="bg-white  rounded-xl flex flex-col">
            <div className="w-full border-b px-3 flex items-center justify-between">
            <div>
                <HiOutlineArrowLeft onClick={() => setIsPostPage(false)} className=" cursor-pointer" size={30} />
              </div>
              <div className=" py-2 mx-auto">
                <h4 className="font-semibold text-md ">Create New Post</h4>
              </div>
              <div>
                <h6
                  
                  className="button  font-semibold"
                >
                  Share
                </h6>
              </div>
            </div>
            <div className="flex ">
              <div className="bg-black  rounded-bl-xl">
                <div className="p-2  w-[22rem] h-[23rem]">
                  <img
                    src={profile}
                    className="w-full h-full rounded-full"
                    alt="profile"
                  />
                </div>
              </div>
              <div className="flex max-h-[63.2vh] w-full flex-col gap-1 overflow-hidden overflow-y-scroll">
                <div className="flex items-center p-4 gap-3">
                  <div>
                    <img
                      src={profile}
                      alt="profile"
                      className="w-[2rem] h-[2rem] rounded-full"
                    />
                  </div>
                  <div className="flex flex-col">
                    <h6 className="text-md font-semibold">Cristiano ronaldo</h6>
                  </div>
                </div>
                <div className="px-4 pb-1 border-b">
                  <textarea
                    placeholder="Write a caption..."
                    name="caption"
                    id=""
                    cols="30"
                    rows="10"
                    className="border-none h-52 w-full outline-none placeholder:text-gray-500 text-md"
                  ></textarea>
                  <div className="text-gray-400 flex justify-between items-center">
                    <FaRegSmile size={23} />
                    <p className="text-sm text-gray-400 font-normal">2/2200</p>
                  </div>
                </div>
                <div className="px-4 py-2 border-b  ">
                  <div className="flex items-center justify-between">
                    <h6 className="font-medium text-md ">Advanced settings</h6>
                    {
                        advSettingOpen ? <VscChevronUp onClick={()=>setAdvSettingOpen(false)} className=" cursor-pointer" size={26} /> 
                        : <VscChevronDown onClick={()=>setAdvSettingOpen(true)}  className=" cursor-pointer" size={26} />
                    }
                  </div>
                {
                    advSettingOpen && <>
                      <div className="flex flex-col py-2 items-center">
                    <div className="flex items-center justify-between">
                      <p className="font-normal text-md ">
                        Hide like and view counts on this post
                      </p>
                      <Switch />
                    </div>
                    <div className="py-2">
                      <p className="text-xs leading-4 text-gray-400 font-normal">
                        Only you will see the total number of likes and views on
                        this post. You can change this later by going to the ···
                        menu at the top of the post. To hide like counts on
                        other people's posts, go to your account settings.
                        <span className="text-blue-900 hover:underline"> Learn
                        more</span>
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
                      You can change this later by going to the ··· menu at the top of your post.
                      </p>
                    </div>
                  </div>
                    </>
                }
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
