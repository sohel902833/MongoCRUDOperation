const express=require('express')
const mongoose=require('mongoose')
const dotenv=require('dotenv')


const app=express();
dotenv.config();
app.use(express.json())
//database connection

mongoose.connect('mongodb://localhost/todos',{
    useNewUrlParser: true ,
    useUnifiedTopology: true
}).then(res=>{
    console.log("Database Connected")
}).catch(err=>{
    console.log("Database Connection Failed")
})


app.use('/todo',require('./routes/todoRoutes'))
app.use('/user',require('./routes/userRoutes'))



function errorHandler(err,req,res,next){
    if(res.headersSent){
        return next(err)
    }
    res.status(500).json({error:err})
}

app.listen(3000,()=>{
    console.log('listening on port 3000')
})
