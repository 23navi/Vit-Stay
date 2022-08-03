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

//show all campgrounds
app.get("/campground",async (req,res)=>{
    const campgrounds= await Campground.find({});
    console.log("get/campground");
    res.status(200).render("campground/index.ejs",{campgrounds})
})


//create new campground

//1: get/form 
app.get("/campground/new",(req,res)=>{
    res.status(200).render("campground/new.ejs");
})

//2: post/form accept
app.post("/campground",async (req,res)=>{
    const camp = new Campground(req.body);
    await camp.save();
    res.status(200).redirect(`campground/${camp.id}`);
})


//edit campground
//1: Edit form

app.get("/campground/edit/:id",async (req,res)=>{
    const camp= await Campground.findById(req.params.id);
    console.log(req.params);
    res.status(200).render("campground/edit.ejs",{camp})

})

app.put("/campground/:id",async (req,res)=>{
    const camp=await Campground.findById(req.params.id);
    camp.title=req.body.title;
    camp.location=req.body.location;
    await camp.save();
    res.status(200).redirect(`/campground/${camp.id}`);
})






//show a particular campground
app.get("/campground/:id",async (req,res)=>{
    const camp = await Campground.findById(req.params.id);
    if(camp){
        res.status(200).render("campground/show.ejs",{camp})
    }else{
        console.log("error?")
        res.status(404).send("error! no campground with id");
    }
    
})




//Delete a campground
app.delete("/campground/:id",async (req,res)=>{
    await Campground.findByIdAndDelete(req.params.id);
    res.redirect("/campground");
})





app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
})