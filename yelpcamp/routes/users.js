const express =require ('express');
const mongoose = require("mongoose");
const router =express.Router({mergeParams:true});
const catchasync = require("../utilities/catchasync");
const expresserror = require("../utilities/expresserror");
const user=require('../models/user');
const passport = require('passport');
const {renderregisterform,registeruser,renderloginform,logoutuser,loginuser}=require('../controllers/users')


router.get('/register',renderregisterform)

router.post('/register',catchasync(registeruser))

router.get('/login',renderloginform)

router.post('/login',passport.authenticate('local',{failureFlash:true ,failureRedirect:'/login'}) ,loginuser,(req,res)=>{
   req.session.returnto='/campgrounds';
})

router.get('/logout',logoutuser)


module.exports=router;