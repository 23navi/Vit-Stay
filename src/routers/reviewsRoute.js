const Review =require("../models/reviews");
const ExpressError= require("../../utils/errors/ExpressError");
const catchAsync=require("../../utils/errors/catchAsync");
const Campground =require("../models/campground");
const validateCampgroundJoiSchema= require("../../utils/JoiSchema/validateCampgrooundJoiSchema");
const validateReviewJoiSchema=require("../../utils/JoiSchema/validateReviewJoiSchema");



const express= require("express")
const router= express.Router();







//Delete a campground's review by it's id
router.delete("/campgrounds/:id/reviews/:revId",catchAsync(async(req,res,next)=>{
    const campground= await Campground.findById(req.params.id);
    const review= await Review.findById(req.params.revId);


    //Campground.findByIdAndUpdate(id,{$pull:{reviews:revId}});  // remove the value provided from the array
    //Review.findByIdAndDelete(reviewId)


    campground.reviews=campground.reviews.filter((arrReview)=>{
        return arrReview.toString()!==review.id
    })
    
    await campground.save()
    //r1= await Review.deleteOne({"id":review.id})
    const r2= await Review.findOneAndDelete({"id":review.id}) //note deleteOne do not trigger a middleware so we need to use findOneAndDelete
    
    req.flash("success","Successfully deleted the review");
    res.redirect("/campgrounds/"+campground.id)
}))



// submit form for reviews on a particular campground

router.post("/campgrounds/:id/reviews",validateReviewJoiSchema,catchAsync(async(req,res,next)=>{
    const campground= await Campground.findById(req.params.id);
    const review=await new Review(req.body.review)
    campground.reviews.push(review)
    await campground.save();
    await review.save();
    req.flash("success","Successfully created a new review");
    res.redirect("/campgrounds/"+req.params.id);
}))



module.exports=router;