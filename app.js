const express = require("express");
const path= require("path");
const ejsMate = require('ejs-mate');
const methodoverride=require("method-override");
const ExpressError= require("./utils/errors/ExpressError");
const catchAsync=require("./utils/errors/catchAsync");
const session = require("express-session");
const flash = require("connect-flash");


//routers
const campgroundRouter=require("./src/routers/campgroundRoute");
const reviewRouter=require("./src/routers/reviewsRoute");

require("./src/db/mongoose"); 

const app= express();
const PORT = process.env.PORT || 3000;


app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))



app.use(express.urlencoded({extended:true})); //for post request 
app.use(methodoverride("_method"));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());





const sessionConfig={
    secret:"secret_string",
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires: Date.now()+ 1000*60*60*24*7,   //7 days
        maxAge: 1000*60*60*24*7, //7 days
        HttpOnly:true      , //google search what is does

    }
}
app.use(session(sessionConfig))
app.use(flash());

app.use((req,res,next)=>{
    res.locals.success=req.flash('success');
    res.locals.error=req.flash('error');
    next();
})

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