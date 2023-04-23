const campground = require("../models/campground");
const {cloudinary}=require('../cloudinary')
const axios=require('axios')
const token=process.env.mapboxtoken
module.exports.index = async (req, res) => {
  const campgrounds = await campground.find({});

  res.render("campgrounds/index", { campgrounds });
};

module.exports.newcamp = async (req, res) => {
  //if(!req.campground) throw new expresserror('invalid campground data',400);
  
const newcampground = new campground(req.body.campground);
const data=await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${newcampground.location}.json?limit=1&types=place%2Cpostcode%2Caddress&access_token=${token}`);
newcampground.geometry=data.data.features[0].geometry;

  
  newcampground.images = req.files.map((f) => ({
    url: f.path,
    filename: f.filename,
  }));

  
  newcampground.author = req.user._id;

  await newcampground.save();

  
  req.flash("success", "Succesfully made a new Camground");

  res.redirect(`/campgrounds/${newcampground._id}`);
};

  module.exports.updatecamp = async (req, res) => {
  
  const { id } = req.params;

  const thiscampground = await campground.findByIdAndUpdate(id,{ ...req.body.campground});

  const img = req.files.map((f) => ({
    url: f.path,
    filename: f.filename
  }));

 // console.log(req.body.deleteImages)
 thiscampground.images.push(...img);

 await thiscampground.save();

   if(req.body.deleteImages){
    
    await thiscampground.updateOne({$pull :{images :{filename: {$in: req.body.deleteImages}}}});
   
  

 

  for(let filename of req.body.deleteImages)
  {
    cloudinary.uploader.destroy(filename);
  }
  await thiscampground.save();
}
  req.flash("success", "Succesfully updated  Camground");
  res.redirect(`/campgrounds/${thiscampground._id}`);

};

module.exports.deletecamp = async (req, res) => {
  const { id } = req.params;
  const thiscampground = await campground.findById(id);

  const p = await campground.findByIdAndDelete(id);
  req.flash("success", "Succesfully deleted Camground");
  res.redirect("/campgrounds");
};

module.exports.showcamp = async (req, res) => {
  const { id } = req.params;

  const foundcampground = await campground
    .findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("author");

  if (!foundcampground) {
    req.flash("error", "Cannot find that campground");
    res.redirect("/campgrounds");
  }
  //console.log(foundcampground)
  res.render("campgrounds/show", { campground: foundcampground });
};

module.exports.rendereditform = async (req, res) => {
  const { id } = req.params;
  const thiscampground = await campground.findById(id);

  const foundcampground = await campground.findById(id);
  if (!foundcampground) {
    req.flash("error", "Cannot find that campground");
    res.redirect("/campgrounds");
  } else {
    res.render("campgrounds/edit", { campground: foundcampground });
  }
};



module.exports.rendernewform = (req, res) => {
  res.render("campgrounds/new");
};
