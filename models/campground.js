const mongoose=require('mongoose');
const Schema =mongoose.Schema;
const review =require('./review');


const imageschema =new Schema({
    url:String,
        filename:String
})
imageschema.virtual('thumbnail').get(function(){
    return this.url.replace('/upload','/upload/w_200');
})

const opts ={toJSON: {virtuals :true}};

const CampgroundSchema =new Schema({
    title:String,
    images:[imageschema],
    geometry:{
        type:{
            type:String,
            enum: ['Point']
           
            
        },
        coordinates :{
            type: [Number]
            
        }
    },
    price:Number,
    description:String,
    location:String,
    author:{
        type:Schema.Types.ObjectId,
        ref:'user'
    },
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:'review'
        }
    ],
    
},opts);

//virtual components arenot stored in database they are just a modified version of data stored already in db used when it is called

CampgroundSchema.virtual('properties.popUpMarkup').get(function(){
    return `  <a href="/campgrounds/${this._id}">${this.title}</a> 
      <p>${this.description.substring(0,40)}...</p>
    `
})



//mongoose middleware
CampgroundSchema.post('findOneAndDelete',async function(doc){
    if(doc){
        await review.deleteMany({
            _id:{
                $in:doc.reviews
            }
        })
    }
  })
module.exports= mongoose.model('campground',CampgroundSchema);