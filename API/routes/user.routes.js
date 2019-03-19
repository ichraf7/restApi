const express =require('express')
const routes = express.Router()
const check_auth =require('../middleware/check_auth')
const userController =require('../controller/user.controller')

routes.post('/signup',userController.user_signup)


/* just for test
routes.get('/signup',(req,res,next)=>{
    User.find().exec()
    .then(result=>{
    res.status(200).json({result})
    })
    .catch(err=>{
        res.status(500).json({error:err})
    })
  
})
*/
//delete user
routes.delete('/signup/:userID',check_auth,userController.delete_user)

//user login

routes.post('/login' ,userController.user_login)
module.exports=routes