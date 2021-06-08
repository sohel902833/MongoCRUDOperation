const jwt=require('jsonwebtoken')

const checkAuth=(req,res,next)=>{

  const {authorization}=req.headers;
  
  try{
    const token=authorization.split(" ")[1];
    const decoded=jwt.verify(token,process.env.JWT_SECRET)
    const {username,userId,name}=decoded;

    req.username=username
    req.userId=userId
    req.name=name;

    next();



  }catch(err){
    next("Authentication Failure")
  }





}



module.exports=checkAuth;