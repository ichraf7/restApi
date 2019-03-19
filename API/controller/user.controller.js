const User =require('../models/user.model')
const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const jwt =require('jsonwebtoken') 

exports.user_signup=(req,res,next)=>{
    //verifying that user don t exist
    User.find({email:req.body.email}).exec()
    .then(user=>{
        console.log(user)
        if(user.length){
          res.status(409).json({message:"email already used"})
        } 

        else{
       //hashing password
       bcrypt.hash(req.body.passwd ,10 ,(err,hash)=>{
       if(err){
        console.log(err)
        res.status(500).json({
            error:err
        })
      }
      else{
        const user=new User({
            _id:mongoose.Types.ObjectId(),
            email:req.body.email,
            password:hash
     })
       user.save()
       .then(result=>{
       console.log(result)
        res.status(200).json({message:'user created successfully'})
       })
       .catch(err=>{
        console.log(err)
        res.status(500).json({
        message:err
       })
   })
  }
})   
}
})        
           .catch(err=>{
           res.status(500).json({
            error:err
        })
    })
}

exports.delete_user=(req,res,next)=>{
    const id=req.params.userID
    console.log(id)
    User.remove({_id:id}).exec()
    .then(result=>{
       res.status(200).json({
           message:"user deleted successfully"
        })
       })
    .catch(err =>{
        error:err
    })
   }

exports.user_login=(req,res,next)=>{
    User.findOne({email:req.body.email}).exec()
    .then(user=>{
      if (user!=null){
        bcrypt.compare(req.body.passwd ,user.password ,(err,result)=>{
            if(err){
              res.status(401).json({
                    message:" auth failed"
                })
            }
            if(result){
                const token=jwt.sign(
                    {
                     email:user.email ,
                     userID :user._id
                    } ,
                    
                        process.env.JWT_KEY,
                        {
                            expiresIn :"1h"
                        })

                res.status(200).json({
                    message:"auth successful" ,
                    token :token,
                    userID:user._id
            })
            }
            else if(!result){
                 res.status(401).json({
                    message:" auth failed"
                })
            }
            
        }) 
      }
      else{
          res.status(401).json({
              message:"auth failed"
          })
      }
      
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
}   