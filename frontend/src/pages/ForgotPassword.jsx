import React from "react";
import { BsFileLock } from "react-icons/bs";

const ForgotPassword = () => {
  return (
    <div className="bg-gray-100 flex  h-screen w-[75%] ml-[22%]">
      <div className="mx-auto mt-12 w-96">
        <div className="bg-white border w-full ">
          <div className="flex items-center  justify-center flex-col gap-4  p-8">
            <div>
              <BsFileLock size={100} />
            </div>
            <div>
              <h6 className="font-semibold text-md ">Trouble logging in?</h6>
            </div>
            <div className="px-2">
              <p className="text-sm text-gray-400 font-normal">
                Enter your email, phone, or username and we'll send you a link
                to get back into your account.
              </p>
            </div>
            <div className="w-[18rem]">
                <input type="text" placeholder="username or email" className="
                rounded-md h-10  bg-gray-200 px-4" />
            </div>
            <div className="ml-3">
                <button className=" py-1 px-[6rem]  button-two font-semibold text-white">Send login link</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
