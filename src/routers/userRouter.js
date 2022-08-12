const ExpressError= require("../../utils/errors/ExpressError");
const catchAsync=require("../../utils/errors/catchAsync");
const Joi=require("joi");

const express= require("express")
const router= express.Router();



router.get("/register",(req,res,next)=>{
    res.render("users/register.ejs");
})


router.get("/login",(req,res,next)=>{
    res.render("users/login.ejs");
})


module.exports= router;