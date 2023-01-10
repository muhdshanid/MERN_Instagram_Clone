import React from "react";
import instaFont from "../assets/images/insta-font.png";
import {GrHomeRounded} from 'react-icons/gr'
import {FiSearch} from 'react-icons/fi'
import {FaRegCompass} from 'react-icons/fa'
import {RiMessengerLine} from 'react-icons/ri'
import {GiHamburgerMenu} from 'react-icons/gi'
import profile from '../assets/images/profile.jpg'
import {AiOutlineHeart} from 'react-icons/ai'
import {BsPlusSquare} from 'react-icons/bs'
import { useState } from "react";
const SideBar = () => {
  const [searchOpen, setSearchOpen] = useState(false)
 const [homeHover, setHomeHover] = useState(false)
 const [searchHover, setSearchHover] = useState(false)
 const [exploreHover, setExploreHover] = useState(false)
 const [messagesHover, setMessagesHover] = useState(false)
 const [notiHover, setNotiHover] = useState(false)
 const [createHover, setCreateHover] = useState(false)
 const [profileHover, setProfileHover] = useState(false)
 const [moreHover, setMoreHover] = useState(false)
  return (
    <div
      className="text-black/80 font-medium 
    px-10 w-64 bg-white border 
    h-screen fixed "
    >
     <div className="relative">
     <div className="">
        <img src={instaFont} className="text-left -ml-5 mt-4" alt="logo" />
      </div>
      <div className="flex flex-col gap-1 mt-4 ">
       <div onMouseLeave={()=>setHomeHover(false)} 
       onMouseMove={()=>setHomeHover(true)} className=" flex w-[230px]  justify-between items-center hover:bg-gray-100 h-[3.3rem]
        rounded-xl transition-all  mt-0 -ml-[28px]">
       <div className="flex gap-4 ml-4 justify-start  items-center">
            <GrHomeRounded className="transition-all " size={homeHover ? 27 : 26}/>
            <h3 className="font-normal text-md ">Home</h3>
        </div>
       </div>
       <div onClick={()=>setSearchOpen((prev) => !prev)}  onMouseLeave={()=>setSearchHover(false)} 
       onMouseMove={()=>setSearchHover(true)}  className={` cursor-pointer flex w-[230px]  justify-between items-center hover:bg-gray-100 h-[3.3rem]
        rounded-xl transition-all mt-0 -ml-[28px]`}>
       <div className={`flex gap-4 ml-3 justify-start  items-center`}>
            <FiSearch className="transition-all" size={searchHover ? 27 : 26}/>
            <h3 className="font-normal text-md ">Search</h3>
        </div>
       </div>
       <div onMouseLeave={()=>setExploreHover(false)} 
       onMouseMove={()=>setExploreHover(true)} className=" flex w-[230px]  justify-between items-center hover:bg-gray-100 h-[3.3rem]
        rounded-xl transition-all   -ml-[30px]">
       <div className="flex gap-4 ml-4 justify-start  items-center">
            <FaRegCompass className="transition-all" size={exploreHover ? 27 : 26}/>
            <h3 className="font-normal text-md">Explore</h3>
        </div>
       </div>
       <div onMouseLeave={()=>setMessagesHover(false)} 
       onMouseMove={()=>setMessagesHover(true)} className=" flex w-[230px]  justify-between items-center hover:bg-gray-100 h-[3.3rem]
        rounded-xl transition-all  mt-0 -ml-[30px]">
       <div className="flex gap-4 ml-4 justify-start  items-center">
            <RiMessengerLine className="transition-all" size={messagesHover ? 27 : 26}/>
            <h3 className="font-normal text-md">Messages</h3>
        </div>
       </div>
       <div onMouseLeave={()=>setNotiHover(false)} 
       onMouseMove={()=>setNotiHover(true)} className=" flex w-[230px]  justify-between items-center hover:bg-gray-100 h-[3.3rem]
        rounded-xl transition-all  mt-0 -ml-[30px]">
       <div className="flex gap-4 ml-4 justify-start  items-center">
            <AiOutlineHeart className="transition-all" size={notiHover ? 27 : 26}/>
            <h3 className="font-normal text-md">Notifications</h3>
        </div>
       </div>
       <div onMouseLeave={()=>setCreateHover(false)} 
       onMouseMove={()=>setCreateHover(true)} className=" flex w-[230px]  justify-between items-center hover:bg-gray-100 h-[3.3rem]
        rounded-xl transition-all  mt-0 -ml-[30px]">
       <div className="flex gap-4 ml-4 justify-start  items-center">
            <BsPlusSquare className="transition-all" size={createHover ? 27 : 26}/>
            <h3 className="font-normal text-md">Create</h3>
        </div>
       </div>
       <div onMouseLeave={()=>setProfileHover(false)} 
       onMouseMove={()=>setProfileHover(true)} className=" flex w-[230px]  justify-between items-center hover:bg-gray-100 h-[3.3rem]
        rounded-xl transition-all  mt-0 -ml-[30px]">
       <div className="flex gap-4 ml-4 justify-start  items-center">
            <img className={`${ profileHover ? "w-9 h-9 rounded-full transition-all" :
             "w-8 h-8 rounded-full transition-all"}`} src={profile} alt="profile" />
            <h3 className="font-normal text-md">Profile</h3>
        </div>
       </div>
       <div onMouseLeave={()=>setMoreHover(false)} 
       onMouseMove={()=>setMoreHover(true)} className=" flex w-[230px]  justify-between items-center hover:bg-gray-100 h-[3.3rem]
        rounded-xl transition-all  mt-0 -ml-[30px]">
       <div className="flex gap-4 ml-4 justify-start  items-center">
            <GiHamburgerMenu className="transition-all" size={moreHover ? 27 : 26}/>
            <h3 className="font-normal text-md">More</h3>
        </div>
       </div>
      </div>
      {
        searchOpen ? 
        <div className="transition-all w-[400px] bg-black z-[100] h-screen  rounded-br-xl rounded-tr-xl absolute  
        -top-4 left-6">

        </div> : ""}
      
     </div>
    </div>
  );
};

export default SideBar;
