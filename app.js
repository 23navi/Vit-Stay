const express = require("express");
const {mongoose} = require("mongoose");
const path= require("path");
require("./src/db/mongoose");
const ejsMate = require('ejs-mate');
const methodoverride=require("method-override");
const Campground =require("./src/models/campground");
const ExpressError= require("./utils/errors/ExpressError");
const catchAsync=require("./utils/errors/catchAsync");
const Joi=require("joi");
const campgroundJoiSchema= require("./utils/JoiSchema/campgrooundJoiSchema")

const app= express();
const PORT = process.env.PORT || 3000;




app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))


app.use(express.urlencoded({extended:true})); //for post request 
app.use(methodoverride("_method"));
app.use(express.json());










app.get("/",(req,res)=>{
    res.render("home");
})

//show all campgrounds
app.get("/campgrounds",catchAsync(async (req,res)=>{
    const campgrounds= await Campground.find({});
    res.status(200).render("campgrounds/index.ejs",{campgrounds})
}))


//create new campground

//1: get/form 
app.get("/campgrounds/new",(req,res)=>{
    res.status(200).render("campgrounds/new.ejs");
})

//2: post/form accept
app.post("/campgrounds",catchAsync(async (req,res)=>{
    const campground = new Campground(req.body.campground);
    await campground.save();
    res.status(200).redirect(`campgrounds/${campground.id}`);
}))


//edit campground
//1: Edit form

app.get("/campgrounds/:id/edit",catchAsync(async (req,res)=>{
    const campground= await Campground.findById(req.params.id);
    res.status(200).render("campgrounds/edit.ejs",{campground})

}))

app.put("/campgrounds/:id",catchAsync(async (req,res)=>{
    const campground=await Campground.findByIdAndUpdate(req.params.id);
    res.status(200).redirect(`/campgrounds/${campground.id}`);
}))






//show a particular campground
app.get("/campgrounds/:id",catchAsync(async (req,res)=>{
    const campground = await Campground.findById(req.params.id);
    if(campground){
        console.log(campground.image);
        res.status(200).render("campgrounds/show.ejs",{campground})
    }else{
        res.status(404).send("error! no campground with id");
    }
    
}))




//Delete a campground
app.delete("/campgrounds/:id",catchAsync(async (req,res)=>{
    await Campground.findByIdAndDelete(req.params.id);
    res.redirect("/campgrounds");
}))



app.all("*",(req,res,next)=>{
    return next(new ExpressError("Page not found",404));
})




app.use((err,req,res,next)=>{
    const {message="Error",status}=err
    res.send({err,message,status});
})





app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
})