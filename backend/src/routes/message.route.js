import express from 'express';
const router=express.Router();

router.get('/send',(req,res)=>
{
    res.send({message:"Send Message API is working"});
})
router.get('/receive',(req,res)=>
{
    res.send({message:"Receive Message API is working"});
})
export default router;

