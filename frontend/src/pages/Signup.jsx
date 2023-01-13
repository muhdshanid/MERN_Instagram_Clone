import React, { useEffect, useState } from "react";
import instaFont from "../assets/images/insta-font.png";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { RxCrossCircled } from "react-icons/rx";
import { motion } from "framer-motion";
import { useUserSignupMutation } from "../store/services/authServices";
import { showError } from "../utils/showError";
import Loading from "../components/loading/Loading";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../store/reducers/authReducer";
const Signup = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isEmailAvail, setIsEmailAvail] = useState(null);
  const [isFullnameAvail, setIsFullnameAvail] = useState(null);
  const [isUsernameAvail, setIsUsernameAvail] = useState(null);
  const [isPasswordAvail, setIsPasswordAvail] = useState(null);
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [signupUser, res] = useUserSignupMutation();
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
  const fullnameOnchange = (e) => {
    let value = e.target.value;
    setFullname(e.target.value);

    if (value.length > 5) {
      setIsFullnameAvail(true);
    } else {
      setIsFullnameAvail(false);
    }
  };
  const usernameOnchange = (e) => {
    let value = e.target.value;
    setUsername(e.target.value);

    if (value.length > 5) {
      setIsUsernameAvail(true);
    } else {
      setIsUsernameAvail(false);
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
      isFullnameAvail === true &&
      isUsernameAvail === true &&
      isPasswordAvail === true
    ) {
      signupUser({ email, fullname, username, password });
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
    <div className="w-full  bg-gray-100 flex-col min-h-screen">
      <div className=" min-h-screen sm:w-8/12 md:w-6/12 lg:w-4/12 xl:w-4/12 mx-auto flex flex-col gap-2 justify-center ">
        <motion.div
          initial={{ opacity: 0, x: "-100vw" }}
          animate={{ opacity: 1, x: 0 }}
          className=" bg-white border my-4 mx-auto"
        >
          <div className="px-12 py-8">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-center">
                <img
                  src={instaFont}
                  className="text-left  w-[190px]"
                  alt="logo"
                />
              </div>
              <div className="flex flex-col  items-center justify-center">
                <h4 className="font-semibold text-lg text-gray-400">
                  Sign up to see photos and videos{" "}
                </h4>
                <h4 className="font-semibold text-lg text-gray-400">
                  from your friends.
                </h4>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-2 mt-8 items-center ">
                  <div className="w-[100%] relative">
                    <input
                      type="text"
                      className=" 
                    placeholder:font-light box-border border placeholder:text-gray-400 placeholder:text-sm
                     bg-gray-100 px-4 outline-none py-1 w-[100%]"
                      placeholder="Email"
                      value={email}
                      name="email"
                      onChange={emailOnchange}
                    />
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
                  <div className="w-[100%] relative">
                    <input
                      type="text"
                      className="pl 
                    placeholder:font-light box-border border placeholder:text-gray-400 placeholder:text-sm
                     bg-gray-100 outline-none px-4 py-1 w-[100%]"
                      placeholder="Full Name"
                      value={fullname}
                      name="fullname"
                      onChange={fullnameOnchange}
                    />
                    {isFullnameAvail === true ? (
                      <div className="absolute top-1 right-2 text-gray-400">
                        <AiOutlineCheckCircle size={26} />
                      </div>
                    ) : isFullnameAvail === false ? (
                      <div className="absolute top-1 right-2 text-red-500">
                        <RxCrossCircled size={26} />
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="w-[100%] relative">
                    <input
                      type="text"
                      className="pl 
                    placeholder:font-light box-border border placeholder:text-gray-400 placeholder:text-sm
                     bg-gray-100 outline-none px-4 py-1 w-[100%]"
                      placeholder="Username"
                      value={username}
                      name="username"
                      onChange={usernameOnchange}
                    />
                    {isUsernameAvail === true ? (
                      <div className="absolute top-1 right-2 text-gray-400">
                        <AiOutlineCheckCircle size={26} />
                      </div>
                    ) : isUsernameAvail === false ? (
                      <div className="absolute top-1 right-2 text-red-500">
                        <RxCrossCircled size={26} />
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  {showError(errors, "username") && (
                    <div
                      className="  
                       text-rose-600 font-medium w-[100%] flex
                       items-center justify-start text-sm"
                    >
                      {showError(errors, "username")}
                    </div>
                  )}
                  <div className="w-[100%] relative">
                    <input
                      type="text"
                      className="pl 
                    placeholder:font-light box-border border placeholder:text-gray-400 placeholder:text-sm
                     bg-gray-100 outline-none px-4 py-1 w-[100%]"
                      placeholder="Password"
                      value={password}
                      name="password"
                      onChange={passOnchange}
                    />
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
                </div>

                <div className="p-2">
                  <p className="text-gray-400 text-xs font-normal">
                    People who use our service may have uploaded your contact
                    information to Instagram.
                    <span className="text-blue-800 hover:underline">
                      {" "}
                      Learn More
                    </span>
                  </p>
                </div>
                <div className="p-2">
                  <p className="text-gray-400 text-xs font-normal">
                    By signing up, you agree to our{" "}
                    <span className="text-blue-800 hover:underline">
                      Terms , Privacy Policy
                    </span>{" "}
                    and{" "}
                    <span className="text-blue-800 hover:underline">
                      Cookies Policy
                    </span>{" "}
                    .
                  </p>
                </div>

                <div className="flex items-center mt-4 justify-center">
                  <button
                    disabled={
                      isEmailAvail === false ||
                      isFullnameAvail === false ||
                      isUsernameAvail === false ||
                      isPasswordAvail === false
                    }
                    type="submit"
                    className={`
                    button-two py-1 w-[97%] ${
                      res?.isLoading ? "blue" : " text-white"
                    }  font-semibold`}
                  >
                    {res?.isLoading ? "Sign up" : "Signup"}
                  </button>
                </div>
                {res?.isLoading && (
                  <div className="absolute w-80 -mt-7 flex items-center justify-center">
                    <Loading />
                  </div>
                )}
              </form>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: "-100vw" }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white border mb-4 w-full mx-auto"
        >
          <div className="py-6 px-6">
            <div className="flex items-center justify-center">
              <h6 className="font-normal text-base">
                Have an account?
                <Link to="/login" className="text-[#0095f6] font-normal">
                  {" "}
                  Log in
                </Link>
              </h6>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;
