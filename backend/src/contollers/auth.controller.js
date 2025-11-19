import User from '../models/User.js';
import { generateToken } from '../lib/utils.js';
import bcrypt from 'bcryptjs';
export const signup=async(req,res)=>
{
    const {fullName,email,password}=req.body;

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
        res.status(500).send({message:"internal Server Error for signup"});
    }

};

export const login=async(req,res)=>
{

    const {email,password}=req.body;
    try{
        const user=await User.findOne({email});
        if(!user) return res.status(400).send({message:"Invalid creditionals"});
        
        const isPasswordCorrect=await bcrypt.compare(password,user.password);
        if(!isPasswordCorrect) return res.status(400).send({message:"Invalid password"});

        generateToken(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
        });
    }catch(error)
    {
        console.error("Error in login controller:",error);
        res.status(500).json({message:"internal Server Error"});
    }

};





export const logout=(_,res)=>
{
    res.cookie("jwt","",{maxAge:0});
    res.status(200).json({message:"Logged out successfully"});

}