const Todo=require('../Schema/todoSchema')

const addTodo=async(req,res,next)=>{
    try{
    let{title,description,status,date}=req.body

    let newTodo=new Todo({
        title,description,status,date
    });

    const result=await newTodo.save();
    console.log(result)
    console.log("hello")
    res.status(200).json({
        message:"Data Added Successful",
        result
    })


    }catch{
        res.status(400).json({
            message:"Server Error"
        })
    }


}
const getTodo=async(req,res,next)=>{
try{
     let todos= await Todo.find().select({
      _id:0,
      date:0
  }); 
  res.json({
      todos
  })
}catch(err){
    res.json({
        err
    }) 
}
 
}
const getSingleTodo=async(req,res,next)=>{
    try{
        let todos= await Todo.find({_id:req.params.id}); 
        res.json({
            todos
        })
    }catch(err){
        res.json({
            err
        })  
    }
    
}
const updateTodo=async(req,res,next)=>{
    try{
        let{id}=req.params
         let result= await  Todo.updateOne({_id:id},{$set:req.body},{new:true})


         res.json({
             message:"Data Updated Successful",
             result
         })

    }catch(err){
        res.json({
            message:"Server Error Found",
            err
        })
    }

}
const postMultipleTodo=async(req,res,next)=>{
  
        // let newMultipleTodo=new Todo(req.body)
       Todo.insertMany(req.body) 
                .then(data=>{
                    res.json({
                        message:"Insert Successful",
                        data
                    })
                }).catch(err=>{
                    res.json({
                        message:"server error found",
                        err
                    })
                })
}
const deleteTodo=async(req,res,next)=>{
   let result= await Todo.deleteOne({_id:req.params.id})
   res.json({
       message:"Successful Deleted",
       result
   })
}
const getActiveTodo=async(req,res,next)=>{
    try{
        console.log("here")
        let todo=new Todo()
        let activeTodo=await todo.findActive();
        res.json({
            activeTodo
        })
    }catch(err){
        res.json({
            err
        })
    }
}
module.exports={
 addTodo,
 getSingleTodo,
 updateTodo,
 postMultipleTodo,
 deleteTodo,
 getTodo,
 getActiveTodo
}