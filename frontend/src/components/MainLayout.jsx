import React, { useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import CreatePost from "./CreatePost";
import SideBar from "./SideBar";
import {IoClose} from 'react-icons/io5'
import EditPost from "./EditPost";
import EditGender from "./EditGender";
import { DataContext } from "../context/DataProvider";
const MainLayout = () => {
  const {isGenderEditModal,setIsGenderEditModal} = useContext(DataContext)
  const [modalOpen, setModalOpen] = useState(false)
  const [isEditPage, setIsEditPage] = useState(false)
 
  return (
    <div className="flex   bg-gray-100 relative ">
           { modalOpen && <div  className='w-screen fixed min-h-screen  z-50 bg-black/60 '>
              <div className="absolute flex mx-auto h-[300px] w-full top-[15%] ">
              { !isEditPage ?
              <CreatePost setIsEditPage={setIsEditPage} /> :
              <EditPost setModalOpen={setModalOpen}  setIsEditPage={setIsEditPage}/>}
              </div>
              <div  className="absolute  top-3 right-6 text-white">
                <IoClose onClick={()=>setModalOpen(false)} className=" cursor-pointer" size={30}/>
              </div>
            </div>  }
            {
              isGenderEditModal && <><div className="w-screen fixed min-h-screen  z-50 bg-black/60">
             <div className="absolute flex mx-auto w-full top-[28%]">
             <EditGender/>
             </div>
            </div>
          </>
            }
      <SideBar setModalOpen={setModalOpen}  />
      <Outlet />
    </div>
  );
};

export default MainLayout;
