import React, { useContext, useState } from "react";
import { IoClose } from "react-icons/io5";
import { DataContext } from "../../context/DataProvider";

const EditGender = () => {
    const {setIsGenderEditModal,gender,setGender} = useContext(DataContext)
    const [isGenderSelected, setIsGenderSelected] = useState(false)
    let  selectedGender = null ;
    const handleGenderChange = (e) => {
       selectedGender = e.target.value
    }
    const genderSubmit = (e) => {
        e.preventDefault()
        if(selectedGender !== null){
        setGender(selectedGender)
        setIsGenderEditModal(false)
        }else{
        }
    }
    return (
    <div className="w-96    transition-all  mx-auto ">
      <div className="bg-white  rounded-xl flex flex-col">
        <div className="w-full border-b px-2 flex items-center justify-center">
          <div className=" py-2 mx-auto">
            <h4 className="font-semibold text-md ">Gender</h4>
          </div>
          <div className="">
          <IoClose onClick={()=>setIsGenderEditModal(false)} className=" cursor-pointer" size={28}/>
          </div>
        </div>
        <form onSubmit={genderSubmit}>
        <div className="px-4 py-4 flex flex-col">
          <div className="flex gap-2 items-center">
          <input type="radio" defaultChecked={gender === "Male"}
           onChange={handleGenderChange} className="w-[18px] h-[18px]  align-middle" name="gender" value="Male" /> 
          <span className="text-sm font-semibold" >
            Male
          </span>
          <br />
          </div>
          <div className="flex gap-2 items-center">
          <input type="radio" defaultChecked={gender === "Female"}
           onChange={handleGenderChange} className="w-[18px] h-[18px]  align-middle" name="gender" value="Female" /> 
          <span className="text-sm font-semibold" >
            Female
          </span>
          <br />
          </div>
          <div className="flex gap-2 items-center">
          <input type="radio" defaultChecked={gender === "Other"}
           onChange={handleGenderChange} className="w-[18px] h-[18px]  align-middle" name="gender" value="Other" /> 
          <span className="text-sm font-semibold" >
            Other
          </span>
          <br />
          </div>
          <div className="flex gap-2 items-center">
          <input defaultChecked={gender === "Prefer not to say"}
           type="radio"
           onChange={handleGenderChange} 
           className="w-[18px] h-[18px]  align-middle" name="gender" value="Prefer not to say" /> 
          <span className="text-sm font-semibold" >
            Prefer not to say
          </span>
          <br />
          </div>
         </div>
         <div className="px-4 pb-4">
            <button  type='submit'  className="
            button-two w-full py-3 cursor-pointer text-white font-semibold text-sm">Done</button>
         </div>
            </form>
        </div>
      </div>
  );
};

export default EditGender;
