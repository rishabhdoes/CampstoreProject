const campground = require("../models/campground");
const review = require("../models/review");
module.exports.createreview=async(req, res) => {
    const { id } = req.params;
    const thatcamp = await campground.findById(id);
  
    const Review = new review(req.body.review);
    Review.author=req.user._id;
    thatcamp.reviews.push(Review);
    await Review.save();
  
    await thatcamp.save();
    req.flash('success','Succesfully created review');
  
    res.redirect(`/campgrounds/${thatcamp._id}`);
  };

  module.exports.deletereview=async(req,res)=>{

    const {id,reviewid}=req.params;
    await campground.findByIdAndUpdate(id, {$pull: {reviews:reviewid}});
    await review.findByIdAndDelete(req.params.reviewid);
    req.flash('success','Succesfully deleted review');
    res.redirect(`/campgrounds/${id}`)
      
    }