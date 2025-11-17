import express from 'express';
import { signup } from '../contollers/auth.controller.js';
const router=express.Router();

router.get('/signup',signup);
router.get('/login',(req,res)=>
{
    res.send({message:"login API is working"});
})
router.get('/logout',(req,res)=>
{
    res.send({message:"logout API is working"});
})
export default router;