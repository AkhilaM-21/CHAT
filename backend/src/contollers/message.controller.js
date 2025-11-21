import { Message } from "../models/message.js"
import User from "../models/User.js";
export const getAllContacts=async(req,res)=>{
   try{

    const loggedInUserId=req.user._id;
    const filteredUsers=await User.find({_id:{$ne:loggedInUserId}}).select("-password");
    res.status(200).json(filteredUsers);

   }catch(error){ 
    console.error("Error in getAllContacts controller:",error);
    res.status(500).json({message:"Internal Server Error in getAllContacts"});
   }
}
export const getMessagesByUserId=async (req,res)=>{
    try{
        const myId=req.user._id;
        const {id:userToChatId}=req.params;
        const message=await Message.find({
            $or:[
                {senderId:myId,receiverId:userToChatId},
                {senderId:userToChatId,receiverId:myId}
            ]
            })
            res.status(200).json(message);
    }catch(error){
        console.error("Error in getMessagesByUserId controller:",error.message);
        res.status(500).json({message:"Internal Server Error in getMessagesByUserId"});
    }
}
export const sendMessage=async(req,res)=>{
    try{
        const senderId=req.user._id;
        const {id:receiverId}=req.params;
        const {content}=req.body;
        
        if(!content || content.trim()==="")
        {
            return res.status(400).json({message:"Message content cannot be empty"});
        }
        const newMessage=new Message({
            senderId,
            receiverId,
            content,
        });
        await newMessage.save();
        res.status(201).json(newMessage);
    }catch(error)
    {
        console.error("Error in sendMessage controller:",error.message);
        res.status(500).json({message:"Internal Server Error in sendMessage"});
    }
}
export const getChatpartners=async(req,res)=>{
    try{
        const loggedInUserId=req.user._id;
        const messages=await Message.find({
            $or:[{senderId:loggedInUserId},{receiverId:loggedInUserId}],
        });
        const chatPartnerIds=[...new Set(messages.map((msg)=>
            msg.senderId.toString()===loggedInUserId.toString() ? 
            msg.receiverId.toString():
            msg.senderId.toString()
        )
    ),
]
const chatPartners=await User.find({_id:{$in:chatPartnerIds}}).select("-password");
res.status(200).json(chatPartners);
}catch(error)
    {
        console.error("Error in getChatpartners controller:",error.message);
        res.status(500).json({message:"Internal Server Error in getChatpartners"});
    }
}