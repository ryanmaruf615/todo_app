const express = require("express");
const mongoose = require("mongoose");
const todoHandler = require("./routeHandeler/todoHandler");

//express app initialization
const app = express();
app.use(express.json());

//data base connect with mongoose
mongoose.connect('mongodb+srv://ryanmaruf:01676324799Ryan@cluster0.fdpvn.mongodb.net/todos?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(()=>{
        console.log('connection successful with DB')
    })
    .catch(err=>console.log(err));

//application routes
app.use('/',todoHandler);

//default error handler
function errorHandler(err,req,res,next) {
    if(res.headersSent){
        return next(err);
    }
    res.status(500).json({error: err});
}
app.listen(3000,()=>{
    console.log("app listening at port 3000");
});