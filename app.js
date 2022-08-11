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
const validateCampgroundJoiSchema= require("./utils/JoiSchema/validateCampgrooundJoiSchema");
const validateReviewJoiSchema=require("./utils/JoiSchema/validateReviewJoiSchema");
const Review = require("./src/models/reviews");


//routers
const campgroundRouter=require("./src/routers/campgroundRoute");
const reviewRouter=require("./src/routers/reviewsRoute");


const app= express();
const PORT = process.env.PORT || 3000;


app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))


app.use(express.urlencoded({extended:true})); //for post request 
app.use(methodoverride("_method"));
app.use(express.json());


app.use(campgroundRouter); // we are not changing the route like colt steele
app.use(reviewRouter);


app.get("/",(req,res)=>{
    res.render("home");
})




app.all("*",(req,res,next)=>{
    return next(new ExpressError("Page not found",404));
})



app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh No, Something Went Wrong!'
    res.status(statusCode).render('error', { err })
})



app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
})