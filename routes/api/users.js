const express=require('express');
const router=express.Router();


// @route   GET api/post/test
// @desc    Testes users route
// @access  Public
router.get('/test', (req,res) => res.json({msg: "users Works"}));


module.exports=router;