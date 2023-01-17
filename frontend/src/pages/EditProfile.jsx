import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ChangePassword from "../components/userSide/ChangePassword";
import { DataContext } from "../context/DataProvider";
import { updateUser } from "../store/reducers/authReducer";
import {  useUserUpdateDetailsMutation } from "../store/services/userServices";
const EditProfile = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [toggleOptions, setToggleOptions] = useState(true)
    const {user} = useSelector(state => state.authReducer)
    const {setIsGenderEditModal,gender,setGender} = useContext(DataContext)
    const [updateUserDetails,res] =  useUserUpdateDetailsMutation()
    useEffect(()=>{
      setGender(user.gender)
    },[])
    useEffect(()=>{
      if(res.isSuccess) {
        const dataFromLocalStorage =  localStorage.getItem("userData")
        let {user,token} = JSON.parse(dataFromLocalStorage)
        user = res?.data
        localStorage.setItem("userData",JSON.stringify({user,token}))
        dispatch(updateUser(res?.data))
        navigate("/profile")
      }
    },[res.isSuccess])
    const [name, setName] = useState(user.fullname)
    const [username, setUsername] = useState(user.username)
    const [email, setEmail] = useState(user.email)
    const [mobilenumber, setMobilenumber] = useState(user.mobilenumber)
    const [bio, setBio] = useState(user.bio)
    const handeSubmit = (e) => {
      e.preventDefault()
        if(email !== ""){
          updateUserDetails({fullname:name,username,email,mobilenumber,bio,gender})
        }
    }

  return (
    <div className="bg-gray-100 flex   w-[75%] ml-[22%]">
      <div className="my-8 mx-2 flex bg-white border w-full h-auto">
        <div className="flex  flex-col w-[25%] border-r">
          <div onClick={()=>setToggleOptions(true)} className={`flex transition-all relative ${toggleOptions ? "" : "hover:bg-gray-100"} h-12  cursor-pointer  justify-start items-center px-4`}>
           { toggleOptions && <div className="absolute transition-all top-2 rotate-90 -left-3 font-bold text-lg">
                ______
            </div>}
            <p className={`text-sm ${toggleOptions ? "font-semibold" : "font-normal"} pl-3`}>Edit Profile</p>
          </div>
          <div onClick={()=>setToggleOptions(false)} className={`transition-all flex relative ${toggleOptions ? "hover:bg-gray-100" : ""} h-12  cursor-pointer  justify-start items-center px-4`}>
          { !toggleOptions && <div className="absolute transition-all top-2 rotate-90 -left-3 font-bold text-lg">
                ______
            </div>}
            <p className={`text-sm ${toggleOptions ? "font-normal " : "font-semibold"} pl-3 capitalize`}>change password</p>
          </div>
        </div>
        <div className="w-[70%] ml-16">
          {toggleOptions ?<div className="pl-12 transition-all py-4 w-full ">
           <form onSubmit={handeSubmit}>
           <div className="flex items-center gap-8 mt-6 ml-6">
              <div>
                <img
                  src={user.profilePic}
                  alt="profile"
                  className="w-[2.5rem] h-[2.5rem] rounded-full"
                />
              </div>
              <div className="flex flex-col">
                <h6 className="text-sm font-normal">{user.username}</h6>
                <button className="button ">
                  <p className="text-sm">Change profile photo</p>
                </button>
              </div>
            </div>
            <div className="pl-6 py-4 flex w-full">
              <div className="flex gap-8 w-full items-center justify-between">
                <div>
                  <h4 className="font-semibold text-md">Name</h4>
                </div>
                <div className="mt-2 grow -ml-2">
                  <input
                    type="text"
                    className="border w-[23rem] outline-none px-2 py-1 rounded-md"
                    value={name}
                    placeholder=""
                    onChange={(e)=>setName(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="w-[55%] flex flex-col gap-4 ml-[6.1rem]">
              <p className="text-xs font-normal text-gray-400">
                Help people discover your account by using the name you're known
                by: either your full name, nickname, or business name.
              </p>
              <p className="text-xs font-normal text-gray-400">
                You can only change your name twice within 14 days.
              </p>
            </div>
            <div className="pl-8 py-4 flex w-full">
              <div className="flex gap-6 w-full items-center justify-between">
                <div className="-ml-9">
                  <h4 className="font-semibold text-md">Username</h4>
                </div>
                <div className="mt-2 grow ">
                  <input
                    type="text"
                    className="border w-[23rem] outline-none px-2 py-1 rounded-md"
                    value={username}
                    placeholder=""
                    onChange={(e)=>setUsername(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="w-[55%] flex flex-col gap-4 ml-[6.1rem]">
              <p className="text-xs leading-5 font-normal text-gray-400">
                In most cases, you'll be able to change your username back to &nbsp;
                {user.username} for another 12 days.
                <Link to="/">
                  <span className="button hover:underline"> Learn more</span>
                </Link>
              </p>
            </div>
            <div className="pl-8 py-4 flex flex-col gap-1 w-full">
              <div className="flex gap-7 w-full items-center justify-between">
                <div className="-ml-6">
                  <h4 className="font-semibold text-md">Website</h4>
                </div>
                <div className="mt-2 grow ">
                  <input
                    type="text"
                    className="border text-md w-[23rem] text-gray-400 outline-none px-2 py-1 rounded-md"
                    disabled
                    placeholder="Website"
                  />
                </div>
              </div>
              <div className="w-[60%] flex flex-col gap-4 ml-[4.1rem]">
                <p className="text-xs leading-5 font-normal text-gray-400">
                  Editing your links is only available on mobile. Visit the
                  Instagram app and edit your profile to change the websites in
                  your bio.
                </p>
              </div>
            </div>
            <div className="pl-8 py-2 flex w-full">
              <div className="flex gap-8 w-full items-center justify-between">
                <div className="ml-2">
                  <h4 className="font-semibold text-md">Bio</h4>
                </div>
                <div className="mt-2 grow ">
                  <textarea
                    type="text"
                    className="border w-[23rem] outline-none px-2 py-1 rounded-md"
                    onChange={(e)=>setBio(e.target.value)}
                    value={bio}
                  />
                </div>
              </div>
            </div>
            <div className="pl-20 w-[80%] gap-1 pt-6 flex flex-col">
              <h6 className="font-bold ml-4 text-gray-400 text-md">
                Personal information
              </h6>
              <p className="font-normal ml-4 text-gray-400 text-xs">
                Provide your personal information, even if the account is used
                for a business, a pet or something else. This won't be a part of
                your public profile.
              </p>
            </div>
            <div className="pl-6 py-1 flex w-full">
              <div className="flex gap-9 w-full items-center justify-between">
                <div className="ml-1">
                  <h4 className="font-semibold text-md">Email</h4>
                </div>
                <div className="mt-2 grow -ml-2">
                  <input
                    type="text"
                    className="border w-[23rem] outline-none px-2 py-1 rounded-md"
                    value={email}
                    placeholder="Email"
                    onChange={(e)=>setEmail(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="pl-6 py-1 flex w-full">
              <div className="flex -ml-[4.5rem] gap-9 w-full items-center justify-between">
                <div className="ml-1">
                  <h4 className="font-semibold text-md">Phone Number</h4>
                </div>
                <div className="mt-2 grow -ml-2">
                  <input
                    type="text"
                    className="border w-[23rem] outline-none px-2 py-1 rounded-md"
                    value={mobilenumber ? mobilenumber : ""}
                    placeholder=""
                    onChange={(e)=>setMobilenumber(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="pl-6 py-1 flex w-full">
              <div className="flex gap-9 -ml-2.5 w-full items-center justify-between">
                <div className="">
                  <h4 className="font-semibold text-md">Gender</h4>
                </div>
                <div className="mt-2 grow flex items-center -ml-2">
                  <input
                  onClick={()=>setIsGenderEditModal(true)}
                    type="text"
                    className="border w-[23rem] outline-none px-2 py-1 rounded-md"
                    value={gender ? gender : ""}
                    onChange={()=>setGender}
                  />
                </div>
              </div>
            </div>
            <div className="ml-20 pl-4 py-4 ">
                <button type="submit" className="button-two px-4 font-semibold py-1 text-white">Submit</button>
            </div>
           </form>
          </div> : <ChangePassword user={user} />
          }
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
