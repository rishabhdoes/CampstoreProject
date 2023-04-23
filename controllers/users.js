const user=require('../models/user');
const passport = require('passport');

module.exports.renderregisterform=(req,res)=>{
    res.render('users/register')
}

module.exports.registeruser=async(req,res,next)=>{
    try{
   const{email,username,password}=req.body;

   const thisuser=new user({email,username});//checks if username is available or  not and if not then makes the username

   const registereduser=await user.register(thisuser,password)//it takes useranme and password and  salts after hashing store them in db
       req.login(registereduser,err=>{
           if(err) return next(err);
       })
  // console.log(registereduser);

   req.flash('success',"welcome to Yelpcamp");
   res.redirect('/campgrounds')
    }

    catch(e)
    {
        req.flash('error',e.message)
        res.redirect('/register')
    }

    
}
module.exports.loginuser=(req,res)=>{
 
    req.flash('success','Welcome back');
    const return_to=req.session.returnto;
    delete req.session.returnto;
   // console.log(req.session.returnto)
    const redirect_to=( return_to || '/campgrounds')
    delete req.session.returnto;
    


res.redirect(redirect_to);

    
}

module.exports.logoutuser=(req,res)=>{
    req.logout();
    req.flash('success','bye bye');
    res.redirect('/');
}

module.exports.renderloginform=(req,res)=>{
    res.render('users/login')
}