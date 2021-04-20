const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const todoSchema = require('../schemas/todoSchemas');
const ToDo = new mongoose.model("Todo",todoSchema);

//Get all Todos
router.get('/',async (req,res)=>{
    await ToDo.find({status:'active'}).select({
        _id:0,
        date:0,
    })
        // .limit(2)
        .exec((err,data) => {
        if(err){
            res.status(500).json({
                error:"there is a server side error"
            })
        }else {
            res.status(200).json({
                result:data,
            })
        }
    })
});

//Get  Todos
router.get('/:id',async (req,res)=>{
    await ToDo.find({_id: req.params.id},(err,data) => {
        if(err){
            res.status(500).json({
                error:"there is a server side error"
            })
        }else {
            res.status(200).json({
                result:data,
            })
        }
    })
});

//post a Todos
router.post('/',async (req,res)=>{
 const newTodo = new ToDo(req.body);
 await newTodo.save((err)=>{
     if(err){
         res.status(500).json({
             error:"there is a server side error"
         })
     }else {
         res.status(200).json({
             message:"todo inserted successfully"
         })
     }
 });
});

//post multiple Todos
router.post('/all',async (req,res)=>{
   await ToDo.insertMany(req.body,(err)=>{
       if(err){
           res.status(500).json({
               error:"there is a server side error"
           })
       }else {
           res.status(200).json({
               message:"todo many data inserted successfully"
           })
       }
   });
});

//put all Todos
router.put("/:id", async (req,res)=>{
    await ToDo.updateOne(
        {_id:req.params.id},
        {
                    $set:{
                        status: 'inactive',
                    },
    },
        (err)=>{
        if(err){
            res.status(500).json({
                error:"Server side Error",
            });
        }else{
            res.status(200).json({
                message:"ToDo was successfully updated"
            });
        }
    }
    );
});
//Get all Todos
router.delete('/:id',async (req,res)=>{
    await ToDo.deleteOne({_id: req.params.id},(err) => {
        if(err){
            res.status(500).json({
                error:"there is a server side error"
            })
        }else {
            res.status(200).json({
              message:"Delete success"
            })
        }
    })
});

module.exports = router;
