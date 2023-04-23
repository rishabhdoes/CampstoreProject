const express =require ('express');
const mongoose = require("mongoose");
const router =express.Router({mergeParams:true});
const catchasync = require("../utilities/catchasync");
const expresserror = require("../utilities/expresserror");
const campground = require("../models/campground");
const review = require("../models/review");
const { Campgroundschema,reviewschema } = require("../schemas.js"); //this schema is for servers side joi validations
const{validatereview,isloggedin,isreviewAuthor}=require('../middleware');
const { createreview,deletereview } = require('../controllers/reviews');


//adding reviews

router.post("/",isloggedin,validatereview,catchasync(createreview));

  //deleting reviews
  
  router.delete("/:reviewid",isloggedin,isreviewAuthor,catchasync(deletereview))

  module.exports=router;