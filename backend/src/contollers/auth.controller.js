import User from '../models/User.js';
import { generateToken } from '../lib/utils.js';
export const signup=async(req,res)=>
{
    const {fullname,email,password}=req.body;

    try{
        if(!fullName || !email || !password)
        {
            return res.status(400).send({message:"All fields are required"});
        }
        if(password.length<6)
            {
                return res.status(400).send({message:"Password must be at least 6 characters"});
            }
        if(!email.includes("@"))
        {
            return res.status(400).send({message:"Invalid email"});
        }
        const user=await User.findOne({email});
        if(user) return res.status(400).send({message:"User already exists"});
        
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);
        const newUser=await User.create({
            fullName,
            email,
            password:hashedPassword
        });
        if(newUser)
        {
            generateToken(newUser._id,res);
            await newUser.save();
            res.status(201).json({
                _id:newUser._id,
                fullName:newUser.fullName,
                email:newUser.email,
                profilePic:newUser.profilePic,
            });

            //todo:send an welcome email to signup users

        }
        else
        {
            return res.status(400).send({message:"INvalid user data"});
        }
    }catch(error)
    {
        console.error("Error in signup controller:",error);
        res.status(500).send({message:"internal Server Error"});
    }

};
