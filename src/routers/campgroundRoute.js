const Campground =require("../models/campground");
const ExpressError= require("../../utils/errors/ExpressError");
const catchAsync=require("../../utils/errors/catchAsync");
const Joi=require("joi");
const validateCampgroundJoiSchema= require("../../utils/JoiSchema/validateCampgrooundJoiSchema");
const validateReviewJoiSchema=require("../../utils/JoiSchema/validateReviewJoiSchema");



const express= require("express")
const router= express.Router();





//show all campgrounds
router.get("/campgrounds",catchAsync(async (req,res)=>{
    const campgrounds= await Campground.find({});
    res.status(200).render("campgrounds/index.ejs",{campgrounds})
}))


//create new campground

//1: get/form 
router.get("/campgrounds/new",(req,res)=>{
    res.status(200).render("campgrounds/new.ejs");
})

//2: post/form accept
router.post("/campgrounds",validateCampgroundJoiSchema,catchAsync(async (req,res)=>{
    
    const campground = new Campground(req.body.campground);
    await campground.save();
    req.flash("success","Successfully created a new campground");
    res.status(200).redirect(`campgrounds/${campground.id}`);
}))


//edit campground
//1: Edit form

router.get("/campgrounds/:id/edit",catchAsync(async (req,res)=>{
    const campground= await Campground.findById(req.params.id);
    res.status(200).render("campgrounds/edit.ejs",{campground})

}))

router.put("/campgrounds/:id",validateCampgroundJoiSchema,catchAsync(async (req,res)=>{
    const campground=await Campground.findByIdAndUpdate(req.params.id);
    req.flash("success","Successfully updated the campground");
    res.status(200).redirect(`/campgrounds/${campground.id}`);
}))




//show a particular campground
router.get("/campgrounds/:id",catchAsync(async (req,res)=>{
    const campground = await Campground.findById(req.params.id).populate("reviews");
    if(campground){
        
        res.status(200).render("campgrounds/show.ejs",{campground})
    }else{
        req.flash("error","No such campground exist");
        res.redirect("/campgrounds");
    }
    
}))



//Delete a campground
router.delete("/campgrounds/:id",catchAsync(async (req,res)=>{
    await Campground.findByIdAndDelete(req.params.id);
    req.flash("success","Successfully deleted the campground");
    res.redirect("/campgrounds");
}))



module.exports=router;