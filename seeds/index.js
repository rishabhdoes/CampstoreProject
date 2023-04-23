const mongoose = require('mongoose');

const campground=require('../models/campground');
const review= require('../models/review')
const cities=require('./cities.js');
const {places,feel}=require('./seedHelpers');
const db=mongoose.connect('mongodb+srv://op:op@cluster0.hhigoat.mongodb.net/campstore');

db.then(()=>{
    console.log(" database connected");
});

const allimages= [
  {
    url: 'https://res.cloudinary.com/dd1l9ov9j/image/upload/v1644175204/yelpcamp/oqxeu8vrieui6lgqbsq7.jpg',
    filename: 'yelpcamp/ek1azhsx0vyawuf9swyv'
    
  },
  {
    url: 'https://res.cloudinary.com/dd1l9ov9j/image/upload/v1643869467/yelpcamp/euovqsac3jlupx6js4p8.jpg',
    filename: 'yelpcamp/euovqsac3jlupx6js4p8'
    
  },
  
  {
    url: 'https://res.cloudinary.com/dd1l9ov9j/image/upload/v1643802760/yelpcamp/ef4ww3brhmyimbxdhe9l.jpg',
    filename: 'yelpcamp/ef4ww3brhmyimbxdhe9l'
    
  },
  {
    url: 'https://res.cloudinary.com/dd1l9ov9j/image/upload/v1643802763/yelpcamp/hrkhqipw2tlgxcaitm0u.jpg',
    filename: 'yelpcamp/hrkhqipw2tlgxcaitm0u'
    
  },
  {
    url: 'https://res.cloudinary.com/dd1l9ov9j/image/upload/v1643823045/yelpcamp/nuaugoiywhk59rpc8zmg.jpg',
    filename: 'yelpcamp/nuaugoiywhk59rpc8zmg'
    
  },
  {
    url: 'https://res.cloudinary.com/dd1l9ov9j/image/upload/v1644933252/yelpcamp/sl1ilhxqlv6m2tsa8tuv.jpg',
    filename: 'yelpcamp/sl1ilhxqlv6m2tsa8tuv'
    
  },
  {
    url: 'https://res.cloudinary.com/dd1l9ov9j/image/upload/v1644776786/yelpcamp/gvkoscrwlrrrg1ui8r28.jpg',
    filename: 'yelpcamp/gvkoscrwlrrrg1ui8r28'
    
  }
]
const thereviews= ['61f6df9c06d7d9c806d8d4c6','6200214f78d5ede3dec343e6','6200fb93a1e9f47e3f844f62','61fffaaed816fafd311a1492','6200fc0aa1e9f47e3f84504f']



const seedDB=async () =>{
  await campground.deleteMany({});
  
    for(let i=0;i<100;i++)
    {
        const r=Math.floor(Math.random()*1000);
        
        const  c = new campground({
        location:`${cities[r].city} ,${cities[r].state}`,

        title:` ${feel[Math.floor(Math.random() * feel.length)]}  ${places[Math.floor(Math.random() * places.length)]}`,

        images: [
            allimages[r%7],
            allimages[7-r%7]
            
          ],
        author:'61f686313b552e5dfc965979',
        geometry:{
          type: 'Point',
          coordinates: 
          [cities[r].longitude,
           cities[r].latitude,
          ] 
        },
        reviews:[thereviews[r%5],thereviews[5-r%5]],
        
        description: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, libero alia deserunt doloressimilique qui Voluptatibus consequatur in, molestiae omnis assumenda fuga, maxime saepe ut explicabo perferendis numquam veritatis doloribus!",
         
        price:Math.floor(Math.random()*50)
        
    });
    await c.save();

    }
}

seedDB().then(()=>{
    mongoose.connection.close();
})