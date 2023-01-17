import React, { useEffect, useState } from 'react'
import { AiOutlineCheckCircle } from 'react-icons/ai'
import { RxCrossCircled } from 'react-icons/rx'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import {  updateUser } from '../../store/reducers/authReducer'
import { useChangePasswordMutation } from '../../store/services/userServices'
import { showError } from '../../utils/showError'
import Loading from '../loading/Loading'

const ChangePassword = ({user}) => {
    const dispatch = useDispatch()
  const navigate = useNavigate()
    const [errors, setErrors] = useState([])
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [samePass, setSamePass] = useState(null)
    const [isNewPassAvail, setIsNewPassAvail] = useState(null)
    const [isOldPassAvail, setIsOldPassAvail] = useState(null)
    const [isConfirmPassAvail, setIsConfirmPassAvail] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState("")
    const [ChangePassword,res] = useChangePasswordMutation()
    useEffect(() => {
        if (res.isError) {
          setErrors(res?.error?.data?.errors);
        }
      }, [res?.error?.data]);
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
    const oldPassOnchange = (e) => {
        let value = e.target.value;
        setOldPassword(e.target.value);
    
        if (value.length > 5) {
          setIsOldPassAvail(true);
        } else {
          setIsOldPassAvail(false);
        }
      };
      const newPassOnchange = (e) => {
        let value = e.target.value;
        setNewPassword(e.target.value);
    
        if (value.length > 5) {
          setIsNewPassAvail(true);
        } else {
          setIsNewPassAvail(false);
        }
      };
      const confirmPassOnchange = (e) => {
        let value = e.target.value;
        setConfirmPassword(e.target.value);
    
        if (value.length > 5) {
          setIsConfirmPassAvail(true);
        } else {
          setIsConfirmPassAvail(false);
        }
      };
      const handleChangePass = (e) => {
        e.preventDefault()
        if(confirmPassword !== newPassword){
            setSamePass(false)
        }else{
        ChangePassword({oldPassword,newPassword})
        }
      }
  return (
    <div className="pl- py-4 transition-all w-full h-screen">
          <div className="flex items-center gap-8 mt-6 ml-16">
              <div>
                <img
                  src={user.profilePic}
                  alt="profile"
                  className="w-[2.5rem] h-[2.5rem] rounded-full"
                />
              </div>
              <div className="flex flex-col">
                <h6 className="text-md font-normal">{user.username}</h6>
              </div>
            </div>
            <div className="pl-4 pt-12 flex w-full">
              <div className="flex gap-8 w-full items-center justify-between">
                <div>
                  <h4 className="font-semibold text-md">Old Password</h4>
                </div>
                <div className="mt-2 grow relative -ml-2">
                  <input
                    type="text" 
                    className="border bg-gray-50 w-[26rem] outline-none px-2 py-2 rounded-md"
                    placeholder=""
                    value={oldPassword}
                    onChange={oldPassOnchange}
                  />
                  {isOldPassAvail === true ? (
                      <div className="absolute top-2 right-[18%] text-gray-400">
                        <AiOutlineCheckCircle size={26} />
                      </div>
                    ) : isOldPassAvail === false ? (
                      <div className="absolute top-2 right-[18%] text-red-500">
                        <RxCrossCircled size={26} />
                      </div>
                    )  : (
                      ""
                    )}
                    {showError(errors, "password") && (
                    <div
                      className="  
                       text-rose-600 font-medium w-[100%] flex
                       items-center justify-start text-sm"
                    >
                      {showError(errors, "password")}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="pl-[9px] py-2 flex w-full">
              <div className="flex gap-8 w-full items-center justify-between">
                <div>
                  <h4 className="font-semibold text-md">New Password</h4>
                </div>
                <div className="mt-2 grow relative -ml-2">
                  <input
                    type="text" 
                    className="border bg-gray-50 w-[26rem] outline-none px-2 py-2 rounded-md"
                    placeholder=""
                    value={newPassword}
                    onChange={newPassOnchange}
                  />
                  {isNewPassAvail === true ? (
                      <div className="absolute top-2 right-[18%] text-gray-400">
                        <AiOutlineCheckCircle size={26} />
                      </div>
                    ) : isNewPassAvail === false ? (
                      <div className="absolute top-2 right-[18%] text-red-500">
                        <RxCrossCircled size={26} />
                      </div>
                    ) : (
                      ""
                    )}
                </div>
              </div>
            </div>
            <div className="pl-[18px] py-2flex w-full">
              <div className="flex gap-8 w-full items-center justify-between">
                <div>
                  <h4 className="font-semibold text-md">Confirm New <br /> Password</h4>
                </div>
                <div className="mt-2 grow relative -ml-2">
                  <input
                    type="text" 
                    className="border bg-gray-50 w-[26rem] outline-none px-2 py-2 rounded-md"
                    placeholder=""
                    value={confirmPassword}
                    onChange={confirmPassOnchange}
                  />
                  {isConfirmPassAvail === true ? (
                      <div className="absolute top-2 right-[18%] text-gray-400">
                        <AiOutlineCheckCircle size={26} />
                      </div>
                    ) : isConfirmPassAvail === false ? (
                      <div className="absolute top-2 right-[18%] text-red-500">
                        <RxCrossCircled size={26} />
                      </div>
                    ) : (
                      ""
                    )}
                    {
                        samePass === false && 
                        <div
                      className="  
                       text-rose-600 font-medium w-[100%] flex
                       items-center justify-start text-sm"
                    >
                     New password and confirm password should be same
                    </div>
                    }
                </div>
              </div>
            </div>
            <div className="pt-8 ml-20 pl-14">
                <button onClick={handleChangePass} disabled={ isConfirmPassAvail === false ||
                      isOldPassAvail === false || isNewPassAvail === false
                      || isConfirmPassAvail === null ||
                      isOldPassAvail === null || isNewPassAvail === null} 
                      className={`button-two px-4 ${res?.isLoading ? "blue" :"text-white "} font-semibold py-1`}>Change password</button>
            </div>
            {res?.isLoading && (
                  <div className="absolute w-80 -mt-7 ml-14 flex items-center justify-center">
                    <Loading />
                  </div>
                )}
            <div className="ml-20 pl-14 pt-6">
            <Link className="button " to={'/forgot-password'}>Forgot password?</Link>
            </div>
          </div>
  )
}

export default ChangePassword