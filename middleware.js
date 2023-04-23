const catchasync = require("./utilities/catchasync");
const expresserror = require("./utilities/expresserror");
const campground = require("./models/campground");
const review = require("./models/review");
const { Campgroundschema,reviewschema } = require("./schemas.js"); //this schema is for servers side joi validations


//this middleware is used for login /logout and register authentication

module.exports.isloggedin=(req,res,next)=>{                     //it checks if we are logged in 
    req.session.returnto=req.originalUrl;
    if(!req.isAuthenticated())
    {  req.flash('error','you must be signed in');
             return res.redirect('/login')
    
    }

    

    next();
}


module.exports.validatecampground = (req, res, next) => {         //    it will validate every async function  of campgroundschema
    const { error } = Campgroundschema.validate(req.body);
    if (error) {
      const msg = error.details.map((el) => el.message).join(",");
      throw new expresserror(msg, 400);
    } else {
      next();
    }
  };

  module.exports.validatereview = (req, res, next) => {         //    it will validate every async function of reviewschema
    const { error } = reviewschema.validate(req.body);
    if (error) {
      const msg = error.details.map((el) => el.message).join(",");
      throw new expresserror(msg, 400);
    } else {
      next();
    }
  
   
  };

  module.exports.isAuthor=async (req,res,next)=>{                   //it checks that only author can delete its campground or review
    const { id } = req.params;
            const thiscampground= await campground.findById(id);


         if(!thiscampground.author.equals(req.user._id)){
          req.flash('error','you dont have permisson to do this' );
          return res.redirect(`/campgrounds/${thiscampground._id}`)
         }

         else{
           next();
         }
                 
  }


  module.exports.isreviewAuthor=async (req,res,next)=>{                   //it checks that only author can delete its campground or review
    const { reviewid,id } = req.params;
            const thisreview= await review.findById(reviewid);


         if(!thisreview.author.equals(req.user._id)){
          req.flash('error','you dont have permisson to do this' );
          return res.redirect(`/campgrounds/${id}`)
         }

         else{
           next();
         }
                 
  }