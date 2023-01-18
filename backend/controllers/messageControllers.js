import MessageModel from "../models/MessageModel.js"


export const createMessage = async(req,res) => {
    try {
        const from = req.userId
        const {to,message} = req.body
        const newMessage = await MessageModel.create({
            message,
            chatUsers:[from,to],
            senderId:from
        })
        return res.status(200).json(newMessage)
    } catch (error) {
        console.log(error.message);
    return res.status(500).json("Internal server error");
    }
}


export const getMessage = async (req, res) => {
    try {
        const from = req.userId
        const {to} = req.params
        const newMessage = await MessageModel.find({
            chatUsers:{
                $all:[from,to]
            }
        }).sort({updatedAt:1})
        const allMessages = newMessage.map(msg => {
            return {
                myself:msg.senderId.toString() === from,
                message :msg.message
            }
        })
        return res.status(200).json(allMessages)
    } catch (error) {
      console.log(error.message);
      return res.status(500).json("Internal server error");
    }
  };