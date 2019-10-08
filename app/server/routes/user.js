const express = require('express');
const router = express.Router();
const User =require('../moongo-models/users');
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken');
 /**
	* route for singing up
*/

router.post('/signup',(req,res)=>{
    bcrypt.hash(req.body.password,10)
      .then(hash=>{
           const user = new User({
            email:req.body.email,
            password:hash
    })
    user.save()
    .then(result=>{
    res.json(result)
})
    .catch(err=>{
    res.json(err)
})})})
 /**
   * route for loging in
*/

router.post('/login',(req,res)=>{
    User.findOne({email:req.body.email,})
    .then(user=>{
        if(!user){
          return res.json({message:"authen failed"})
        }
       return bcrypt.compare(req.body.password,user.password)
    })
    .then(result=>{

       if(!result){
         return res.json({message:"auth failed"})
       }
       const token= jwt.sign({email:User.email,id:User._id},"qwertyuiokj",{expiresIn:"1h"})
       return res.json({token:token})})
      .catch(err=>{
      return res.json({message:"failedddd"})
    })
})


module.exports=router