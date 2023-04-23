const express =require ('express');
const mongoose = require("mongoose");
const router =express.Router();
const catchasync = require("../utilities/catchasync");
const expresserror = require("../utilities/expresserror");
const campground = require("../models/campground");
const review = require("../models/review");
const joi = require("joi");
const { Campgroundschema,reviewschema } = require("../schemas.js"); //this schema is for servers side joi validations
const {isloggedin,isAuthor,validatecampground}=require('../middleware')
const{index,updatecamp,deletecamp,showcamp,rendereditform,rendernewform,newcamp}=require('../controllers/campgrounds')
const passport = require('passport');
const multer  = require('multer');
const {storage} =require('../cloudinary');
const upload = multer({storage});

  //it will show home page
  
  router.get("/",catchasync(index));

//update

router.put("/:id",isloggedin,isAuthor,upload.array('image',4),validatecampground,catchasync(updatecamp));
  
  
 //delete campgrounds

  router.delete("/:id",isloggedin,isAuthor,catchasync(deletecamp)
  );
  
  
   
   ////it will show new page
  router.get("/new" ,isloggedin,rendernewform);
                                                              //it will show a particular camp 
  
  router.get("/:id",catchasync(showcamp)
  );
                                                                                //it will show edit page
  router.get("/:id/edit",isloggedin,isAuthor,catchasync(rendereditform));
  
  
                                                                       //it will make a new camp 
  router.post("/",isloggedin,upload.array('image',4),validatecampground,catchasync(newcamp));


  
  module.exports=router;