import express from 'express';
const router=express.Router();

router.get('/signup',(req,res)=>
{
    res.send({message:"Signup API is working"});
})
router.get('/login',(req,res)=>
{
    res.send({message:"login API is working"});
})
router.get('/logout',(req,res)=>
{
    res.send({message:"logout API is working"});
})
export default router;