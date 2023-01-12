import React from "react";
import instaFont from "../assets/images/insta-font.png";
import {GrHomeRounded} from 'react-icons/gr'
import {FiSearch} from 'react-icons/fi'
import {FaRegCompass} from 'react-icons/fa'
import {RiMessengerLine} from 'react-icons/ri'
import {GiHamburgerMenu} from 'react-icons/gi'
import {Link} from 'react-router-dom'
import profile from '../assets/images/profile.jpg'
import {AiOutlineHeart} from 'react-icons/ai'
import {BsPlusSquare} from 'react-icons/bs'
import { useState } from "react";
import { useTransition,animated } from "react-spring";
import Search from "./Search";
const SideBar = ({setModalOpen}) => {
  const [searchOpen, setSearchOpen] = useState(false)
 const [homeHover, setHomeHover] = useState(false)
 const [searchHover, setSearchHover] = useState(false)
 const [exploreHover, setExploreHover] = useState(false)
 const [messagesHover, setMessagesHover] = useState(false)
 const [notiHover, setNotiHover] = useState(false)
 const [createHover, setCreateHover] = useState(false)
 const [profileHover, setProfileHover] = useState(false)
 const [moreHover, setMoreHover] = useState(false)
 const transition = useTransition(searchOpen,{
  from:{x:-100 ,y:0 ,opacity:0},
  enter:{x:0 ,y:0 ,opacity:1},
  leave:{x:-100 ,y:0 ,opacity:0},
 })
  return (
    <div
      className="text-black/80 font-medium 
    px-10 w-[19%] bg-white border 
    h-screen fixed   bg-"
    >
     <div className="relative">
     <div className={`mt-6 -ml-2`}>
     <div className="">
     <img src={instaFont} className="text-left  -ml-5  w-[120px]" alt="logo" />
     </div>
      </div>
      <div className="flex flex-col gap-2 mt-4 ">
       <Link to={"/"}  onMouseLeave={()=>setHomeHover(false)} 
       onMouseMove={()=>setHomeHover(true)}   className=" flex w-[230px]  justify-between items-center hover:bg-gray-100 h-[3.3rem]
        rounded-xl transition-all  mt-0 -ml-[36px]">
       <div className="flex gap-4 ml-4 justify-start  items-center">
            <GrHomeRounded className="transition-all " size={homeHover ? 27 : 26}/>
            <h3 className="font-normal text-md ">Home</h3>
        </div>
       </Link>
       <div onClick={()=>setSearchOpen((prev) => !prev)}  onMouseLeave={()=>setSearchHover(false)} 
       onMouseMove={()=>setSearchHover(true)}  className={` cursor-pointer flex w-[230px]  justify-between items-center hover:bg-gray-100 h-[3.3rem]
        rounded-xl transition-all mt-0 -ml-[36px]`}>
       <div className={`flex gap-4 ml-3 justify-start  items-center`}>
            <FiSearch className="transition-all" size={searchHover ? 27 : 26}/>
            <h3 className="font-normal text-md ">Search</h3>
        </div>
       </div>
       <div onMouseLeave={()=>setExploreHover(false)} 
       onMouseMove={()=>setExploreHover(true)} className=" flex w-[230px]  justify-between items-center hover:bg-gray-100 h-[3.3rem]
        rounded-xl transition-all   -ml-[36px]">
       <div className="flex gap-4 ml-4 justify-start  items-center">
            <FaRegCompass className="transition-all" size={exploreHover ? 27 : 26}/>
            <h3 className="font-normal text-md">Explore</h3>
        </div>
       </div>
       <div onMouseLeave={()=>setMessagesHover(false)} 
       onMouseMove={()=>setMessagesHover(true)} className=" flex w-[230px]  justify-between items-center hover:bg-gray-100 h-[3.3rem]
        rounded-xl transition-all  mt-0 -ml-[36px]">
       <div className="flex gap-4 ml-4 justify-start  items-center">
            <RiMessengerLine className="transition-all" size={messagesHover ? 27 : 26}/>
            <h3 className="font-normal text-md">Messages</h3>
        </div>
       </div>
       <div onMouseLeave={()=>setNotiHover(false)} 
       onMouseMove={()=>setNotiHover(true)} className=" flex w-[230px]  justify-between items-center hover:bg-gray-100 h-[3.3rem]
        rounded-xl transition-all  mt-0 -ml-[36px]">
       <div className="flex gap-4 ml-4 justify-start  items-center">
            <AiOutlineHeart className="transition-all" size={notiHover ? 27 : 26}/>
            <h3 className="font-normal text-md">Notifications</h3>
        </div>
       </div>
       <div onClick={()=>setModalOpen(true)} onMouseLeave={()=>setCreateHover(false)} 
       onMouseMove={()=>setCreateHover(true)} className=" flex w-[230px]  justify-between items-center hover:bg-gray-100 h-[3.3rem]
        rounded-xl transition-all  mt-0 -ml-[36px]">
       <div className="flex gap-4 ml-4 justify-start  items-center">
            <BsPlusSquare className="transition-all" size={createHover ? 27 : 26}/>
            <h3 className="font-normal text-md">Create</h3>
        </div> 
       </div>
       <Link to={"/profile"} onMouseLeave={()=>setProfileHover(false)} 
       onMouseMove={()=>setProfileHover(true)} className=" flex w-[230px]  justify-between items-center hover:bg-gray-100 h-[3.3rem]
        rounded-xl transition-all  mt-0 -ml-[36px]">
       <div className="flex gap-4 ml-4 justify-start  items-center">
            <img className={`${ profileHover ? "w-9 h-9 rounded-full transition-all" :
             "w-8 h-8 rounded-full transition-all"}`} src={profile} alt="profile" />
            <h3 className="font-normal text-md">Profile</h3>
        </div>
       </Link>
       <div onMouseLeave={()=>setMoreHover(false)} 
       onMouseMove={()=>setMoreHover(true)} className=" flex w-[230px]  justify-between items-center hover:bg-gray-100 h-[3.3rem]
        rounded-xl transition-all  mt-0 -ml-[36px]">
       <div className="flex gap-4 ml-4 justify-start  items-center">
            <GiHamburgerMenu className="transition-all" size={moreHover ? 27 : 26}/>
            <h3 className="font-normal text-md">More</h3>
        </div>
       </div>
      </div>
      {/* {
        searchOpen ? 
        <motion.div  animate={{ x: [0,-90, 0], opacity: 1, scale: 1,ease: [2, 2, 2, 2], }}
        initial={{ opacity: 0, scale: 0.5 }}
        whileHover={{ scale: 1 }} className="transition-all w-[400px] bg-black z-[100] h-screen  rounded-br-xl rounded-tr-xl absolute  
        -top-12 left-6">

        </motion.div> : ""} */}
      {
        transition((style,item)=>
          item ? <animated.div style={style}  className={`transition-all w-[400px]
           bg-white z-[100] h-screen border  rounded-br-xl rounded-tr-xl absolute  
          -top-6 left-4`}>
            <Search/>
          </animated.div>  : ""
        )
      }
     </div>
    </div>
  );
};

export default SideBar;

// {
//   searchOpen === false ?
//     <div className="mt-[21px]" >
//       <img src={instaFont} className="text-left -ml-5 " alt="logo" />
//     </div>
//   : <motion.div className="mt-12" animate={{ x: [-100, 0, 0], opacity: 1, scale: 1 ,ease: [0.5, 0.71, 1, 1.5], }}
//   initial={{ opacity: 0, scale: 0.5 }}
//   whileHover={{scale:1}}>
//     <BsInstagram className="text-left -ml-3 mt-4 mb-8" size={26}/>
//     </motion.div>}