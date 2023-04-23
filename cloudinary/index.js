const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');


cloudinary.config({
    cloud_name: process.env.cloudname,
    api_key: process.env.apikey,
    api_secret:process.env.apisecret
});

const storage=new CloudinaryStorage({
    cloudinary,
    params:{
    folder:'yelpcamp',
    allowedFormats: ['jpeg','png','jpg']
    }
})

module.exports ={
    cloudinary,
    storage
}
