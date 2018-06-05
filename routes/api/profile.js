const express=require('express');
const router=express.Router();


// @route   GET api/profile/test
// @desc    Testes profile route
// @access  Public
router.get('/test', (req,res) => res.json({msg: "profile Works"}));


module.exports=router;