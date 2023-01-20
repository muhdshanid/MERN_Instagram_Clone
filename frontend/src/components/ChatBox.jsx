import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { BsCameraVideo, BsInfoCircle } from "react-icons/bs";
import { FaRegSmile } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import {io} from 'socket.io-client'
import { IoCallOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useCreateMessageMutation, useGetMessagesQuery } from "../store/services/messageServices";
const ChatBox = ({ selectedUser }) => {
    const {user} = useSelector(state => state.authReducer)
    const [inputMessage, setInputMessage] = useState("")
    const [messages, setMessages] = useState([])
    const [arrivalMessage, setArrivalMessage] = useState(null)
    const [createMessage,res] = useCreateMessageMutation()
    const scrollRef = useRef()
    const {data,isFetching} = useGetMessagesQuery(selectedUser?._id)
    const socket = useRef()
    useEffect(()=>{
        if(isFetching === false){
            setMessages(data)
        }
    },[isFetching,selectedUser])
    useEffect(()=>{
        if(selectedUser !== null){
          socket.current = io("http://localhost:5000");
          socket.current.emit("addUser",user._id)
        }
      },[user._id])
      useEffect(()=>{
        scrollRef.current?.scrollIntoView({behavior:"smooth"})
      },[messages])
    const handleSend = (id) => {
        if(inputMessage !== ""){
            const message ={
                myself:true,
                message:inputMessage
            }
            socket.current?.emit("sendMsg",({
                to:id,
                from:user._id,
                message:inputMessage
              }))
            createMessage({to:id,message:inputMessage})
            setMessages(messages.concat(message))
            setInputMessage("")
        }
    }
    useEffect(()=>{
        if(socket.current){
          socket.current.on("msg-receive",(msg)=>{
            setArrivalMessage({myself:false,message:msg})
          })
        }
      },[arrivalMessage])
      useEffect(()=>{
        arrivalMessage && setMessages((pre)=>[...pre,arrivalMessage])
      },[arrivalMessage])
  return (
    <div className="w-[65%] h-full">
     {
        selectedUser === null ? 
        <div className="h-full w-full">
            <div className="flex h-full gap-4 w-full flex-col items-center justify-center">
                <FiSend size={100}/>
                <h6 className="font-normal text-lg ">Your Messages</h6>
                <p className="text-sm font-normal text-gray-400">Send private photos and messages to a friend or group.</p>
            </div>
        </div> : 
        <div className="border-b h-[12%]">
        <div className="p-4 flex  items-center justify-between">
          <div className="px-8">
            <div className="flex  gap-4 items-center">
              <div>
                <img
                  src={selectedUser.profilePic}
                  className="w-8 h-8 rounded-full object-cover"
                  alt="profile"
                />
              </div>
              <div>
               <Link to={`/other-profile/${selectedUser._id}`}>
               <h6 className="hover:text-gray-400">{selectedUser.fullname}</h6></Link>
              </div>
            </div>
          </div>
          <div className="px-8">
            <div className="flex gap-4">
              <IoCallOutline size={27} />
              <BsCameraVideo size={27} />
              <BsInfoCircle size={27} />
            </div>
          </div>
        </div>
        <div className="w-full h-[65vh] overflow-hidden overflow-y-scroll">
            <div className="p-4 flex flex-col gap-2 w-full">
                {
                   messages.length > 0 ? messages.map((msg,i) => (
                        msg.myself === false ?
                        <div key={i} ref={scrollRef} className="flex items-center gap-2">
                        <img
                          src={`${selectedUser?.profilePic}`}
                          className="w-8 h-8 rounded-full object-contain"
                          alt="profile"
                        />
                        <div className="bg-gray-100 p-3  max-w-[50%] float-left  rounded-3xl">
                              <p>{msg.message}</p>
                          </div>
                        </div> : 
                        <div ref={scrollRef} className=" ">
                    <div className="bg-gray-100 p-3 max-w-[50%] float-right  rounded-3xl">
                        <p>{msg.message}</p>
                    </div>
                </div>
                    )) : ""
                }
                 
                  <div>
                  </div>
            </div>
        </div>
        <div>
          <div className="flex p-4 ">
            <div className="flex py-2 px-5 justify-between rounded-full w-full border">
              <FaRegSmile size={27} />
              <input
                type="text"
                className="outline-none 
                    px-2 grow placeholder:text-gray-300"
                placeholder="Message..."
                value={inputMessage}
                onChange={(e)=>setInputMessage(e.target.value)}
              />
              <FiSend 
              className="hover:text-gray-400
               cursor-pointer"
         onClick={()=>handleSend(selectedUser?._id)} size={27} />
            </div>
          </div>
        </div>
      </div>
     }
    </div>
  );
};

export default ChatBox;
