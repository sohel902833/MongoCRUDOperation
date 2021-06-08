const router=require('express').Router()
const {signUpUser,loginUser}=require('../Controller/userController')

router.post('/signup',signUpUser)
router.post('/login',loginUser)


module.exports=router;