import React, { useEffect, useState } from 'react'
import instaFont from "../assets/images/insta-font.png";
import {AiOutlineCheckCircle} from 'react-icons/ai'
import {Link, useNavigate} from 'react-router-dom'
import {RxCrossCircled} from 'react-icons/rx'
import {motion} from 'framer-motion'
import { useDispatch } from 'react-redux';
import { useUserLoginMutation } from '../store/services/authServices';
import { showError } from '../utils/showError';
import { setToken, setUser } from '../store/reducers/authReducer';
import Loading from '../components/loading/Loading';
const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isEmailAvail, setIsEmailAvail] = useState(null);
  const [isPasswordAvail, setIsPasswordAvail] = useState(null);
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");    
  const [loginUser, res] = useUserLoginMutation();
  useEffect(() => {
    if (res.isError) {
      setErrors(res?.error?.data?.errors);
    }
  }, [res?.error?.data]);
  const emailOnchange = (e) => {
    let value = e.target.value;
    setEmail(e.target.value);
    let regex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

    if (value.match(regex) && value.length > 1) {
      setIsEmailAvail(true);
    } else {
      setIsEmailAvail(false);
    }
  };
  const passOnchange = (e) => {
    let value = e.target.value;
    setPassword(e.target.value);

    if (value.length > 5) {
      setIsPasswordAvail(true);
    } else {
      setIsPasswordAvail(false);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      isEmailAvail === true &&
      isPasswordAvail === true
    ) {
      loginUser({ email,password });
    }
  };
  useEffect(()=>{
    if(res.isSuccess){
      localStorage.setItem("userData",JSON.stringify(res?.data))
      dispatch(setUser(res?.data?.user))
      dispatch(setToken(res?.data?.token))
      navigate("/")
    }
  },[res.isSuccess])
  return (
    <div className='w-full  bg-gray-100 flex-col min-h-screen'>
      <div className="   min-h-screen mx-auto  flex flex-col gap-2 justify-center ">
      <motion.div initial={{opacity:0,x:"-100vw"}}
          animate={{opacity:1,x:0}} className=' bg-white border sm:w-10/12 md:w-8/12 lg:w-4/12 xl:w-3/12 -mt-[2rem] mb-4 mx-auto'>
           <div className='px-12 py-8'>
           <div className='flex flex-col gap-2'>
                <div className='flex items-center justify-center'>
                <img src={instaFont} className="text-left  w-[190px]" alt="logo" />
                </div>
               <form onSubmit={handleSubmit} >
               <div className='flex flex-col gap-2 mt-8  items-center '>
                    <div className='w-[100%] relative'>
                    <input type="text"
                     className=' 
                    placeholder:font-light box-border border placeholder:text-gray-400 placeholder:text-sm
                     bg-gray-100 pl-1 outline-none py-1 w-[100%]' 
                    placeholder='Email'
                    value={email}
                    name="email"
                    onChange={emailOnchange}/>
                    {isEmailAvail === true ? (
                      <div className="absolute top-1 right-2 text-gray-400">
                        <AiOutlineCheckCircle size={26} />
                      </div>
                    ) : isEmailAvail === false ? (
                      <div className="absolute top-1 right-2 text-red-500">
                        <RxCrossCircled size={26} />
                      </div>
                    ) : (
                      ""
                    )}
                    </div>
                    {showError(errors, "email") && (
                    <div
                      className="  
                       text-rose-600 font-medium w-[100%] flex
                       items-center justify-start text-sm"
                    >
                      {showError(errors, "email")}
                    </div>
                  )}
                    <div className='w-[100%] relative'>
                    <input type="text"
                     className=' 
                    placeholder:font-light box-border border placeholder:text-gray-400 placeholder:text-sm
                     bg-gray-100 outline-none pl-1 py-1 w-[100%]' 
                    placeholder='Password'
                    value={password}
                      name="password"
                      onChange={passOnchange}/>
                    {isPasswordAvail === true ? (
                      <div className="absolute top-1 right-2 text-gray-400">
                        <AiOutlineCheckCircle size={26} />
                      </div>
                    ) : isPasswordAvail === false ? (
                      <div className="absolute top-1 right-2 text-red-500">
                        <RxCrossCircled size={26} />
                      </div>
                    ) : (
                      ""
                    )}
                    </div>
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
                <div className='flex items-center mt-4 justify-center'>
                    <button  disabled={
                      isEmailAvail === false ||
                      isPasswordAvail === false
                    }
                    type="submit"
                     className={`button-two 
                     py-1 w-[97%] ${
                      res?.isLoading ? "blue" : " text-white"
                    } 
                      font-semibold`}>{res?.isLoading ? "Log in" : "Log in"}</button>
                </div>
                {res?.isLoading && (
                  <div className="absolute w-80 -mt-7 -ml-12 flex items-center justify-center">
                    <Loading />
                  </div>
                )}
               </form>
                <div className="flex my-4 items-center justify-center">
            <Link className="button text-xs font-normal" to={'/forgot-password'}>Forgot password?</Link>
            </div>
            </div>
           </div>
        </motion.div>
        <motion.div initial={{opacity:0,x:"-100vw"}}
          animate={{opacity:1,x:0}}  className='bg-white border sm:w-10/12 md:w-8/12 lg:w-4/12 xl:w-3/12  mb-4  mx-auto'>
            <div className='py-6 px-11'>
                <div className='flex items-center justify-center'>
                    <h6 className='font-normal text-base'>Don't Have an account?
                     <Link to="/signup" className='text-[#0095f6] font-normal'> Sign up</Link></h6>
                </div>
            </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Login