const express = require("express");
const {mongoose} = require("mongoose");
const path= require("path");
require("./src/db/mongoose");
const methodoverride=require("method-override");
const Campground =require("./src/models/campground")

const app= express();
const PORT = process.env.PORT || 3000;

app.set("views",path.join(__dirname,"views"));
app.set("view engine",'ejs');

app.use(express.urlencoded({extended:true})); //for post request 
app.use(methodoverride("_method"));
app.use(express.json());

app.get("/",(req,res)=>{
    res.render("home.ejs");
})


app.get("/makecampground",async (req,res)=>{
    const camp = new Campground({title: "FirstCamp",price:"45",description:"The first ever campground",location:"Surat"})
    await camp.save();
    res.send(camp)
})


app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
})