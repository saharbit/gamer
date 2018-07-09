const express=require('express');
const router=express.Router();



// @route   GET api/posts/test
// @desc    Testes post route
// @access  Public
router.get('/test', (req,res) => res.json({msg: "posts Works"}));

module.exports=router;