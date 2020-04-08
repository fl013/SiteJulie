const express=require("express"),
      mongoose=require("mongoose"),
      bodyParser=require("body-parser");
      app=express();

app.get("/",function(req,res){
    res.render("Landing.html")
})


var msg = 'Hello World';
console.log(msg);
    