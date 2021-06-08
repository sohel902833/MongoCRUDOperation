const User=require("../Schema/userSchema")
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

const signUpUser=async(req,res)=>{

    try{
        let password=req.body.password;

        let hashPass=await bcrypt.hash(password,10)


        const newUser=new User({
            name:req.body.name,
            username:req.body.username,
            password:hashPass
        })
     newUser.save()
        .then(result=>{
            res.json({
                message:"Signup Successful",
                result
            })
        }).catch(err=>{
            res.json({
                message:"Error"
            })
        })
    }catch(err){
        res.json({
            message:"Error",
            err
        })
    }


}

const loginUser=async(req,res)=>{
    try{
      
      const user=await User.find({username:req.body.username})

      if(user && user.length>0){
           const isValidPassword=await bcrypt.compare(req.body.password,user[0].password);
         
           if(isValidPassword){
                //generate token
               const token=jwt.sign({
                   username:user[0].username,
                   userId:user[0]._id,
                   name:user[0].name
               },process.env.JWT_SECRET,{
                   expiresIn:"1h"
               })
        
               res.status(200).json({
                   "access_token":token,
                   "message":"Login successful"
               })




           }else{
            res.status(401).json({
                "error":"Authentication Failed!"
            })  
           }
      }else{
          res.status(401).json({
              "error":"Authentication Failed!"
          })
      }

   
    }catch(err){
        res.json({
            message:"Error",
            err
        })
    }


}

module.exports={
    signUpUser,
    loginUser
}