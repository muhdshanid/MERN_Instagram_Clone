import asyncHandler from "express-async-handler";
import {validationResult} from 'express-validator'
import UserModel from '../models/UserModal.js'
import { comparePassword, createToken, hashedPassword } from "../services/authServices.js";

export const registerUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    try {
      const { email ,username} = req.body;
      const emailExist = await UserModel.findOne({ email });
      const usernameExist = await UserModel.findOne({username})
      if (!emailExist && !usernameExist) {
        const hashed = await hashedPassword(req.body.password);
        req.body.password = hashed
        const user = await UserModel.create(req.body);
        const token = createToken({ id: user._id, name: user.name });
        return res
          .status(201)
          .json({token,user });
      } else if(emailExist && usernameExist) {
           //username and email already taken
           return res
           .status(400)
           .json({
             errors: [{ msg: `${username} is already taken`, param: "username" },
             {msg: `${email} is already exist`, param: "email"}],
           });
      }
       else if(emailExist){
        //email already taken
       return res
       .status(400)
       .json({
         errors: [{ msg: `${email} is already exist`, param: "email" }],
       });
       
      }else{
            //username already taken
            return res
            .status(400)
            .json({
              errors: [{ msg: `${username} is already taken`, param: "username" }],
            });
      }
    } catch (error) {
      console.log(error.message);
      return res.status(500).json("Server internal error");
    }
  } else {
    //validations failed
    return res.status(400).json({ errors: errors.array() });
  }
});

export const loginUser = asyncHandler(async (req,res) => {
    const {email,password} = req.body
    const errors = validationResult(req)
    if(errors.isEmpty()){
        try {
            const user = await UserModel.findOne({email})
            if(user){
                if(await comparePassword(password,user.password)) {
                    const token = createToken({id:user._id,name:user.name})
                    return res.status(200).json({token,user})
                }else{
                    return res.status(400).json({errors:[{msg:`password not matched!`,param:"password"}]})
                }
            }else{
                return res.status(400).json({errors:[{msg:`${email} is not found!`,param:"email"}]})
            } 
        } catch (error) {
            console.log(error.message);
            return res.status(500).json("Server internal error")
        }
    }else{
        //validation failed
        return res.status(400).json({errors:errors.array()})
    }
})