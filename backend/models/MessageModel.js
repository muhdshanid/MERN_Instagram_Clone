import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  chatUsers: {
    type: Array,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"User",
    required: true,
  },
},{
    timestamps:true
});

const MessageModel = mongoose.model("Message", messageSchema);

export default MessageModel;
